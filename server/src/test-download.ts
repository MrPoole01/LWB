import fs from 'fs';
import path from 'path';
import axios from 'axios';

const API_URL = 'http://localhost:3001';
const PDF_PATH = path.join(__dirname, '../public/legacy-wealth-guide.pdf');

async function testDownload() {
  try {
    // First, check if the PDF file exists
    if (!fs.existsSync(PDF_PATH)) {
      console.error('Error: PDF file not found at:', PDF_PATH);
      console.log('\nPlease place your PDF file at:', PDF_PATH);
      process.exit(1);
    }

    // Get file stats
    const stats = fs.statSync(PDF_PATH);
    const originalSize = stats.size;
    console.log('PDF file found:');
    console.log('- Size:', (originalSize / 1024).toFixed(2), 'KB');
    console.log('- Last modified:', stats.mtime);
    console.log('- Full path:', PDF_PATH);

    // Test the download endpoint
    console.log('\nTesting download endpoint...');
    const response = await axios({
      method: 'get',
      url: `${API_URL}/api/download-guide`,
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'application/pdf'
      }
    });

    // Log response details
    console.log('\nResponse details:');
    console.log('- Status:', response.status);
    console.log('- Headers:', JSON.stringify(response.headers, null, 2));
    
    // Get the downloaded file size
    const downloadedSize = response.data.byteLength;
    console.log('- Downloaded size:', (downloadedSize / 1024).toFixed(2), 'KB');

    // Verify the response
    if (response.headers['content-type']?.includes('application/pdf')) {
      console.log('\n✓ Content-Type is correct (application/pdf)');
    } else {
      console.warn('\n⚠ Content-Type is not application/pdf:', response.headers['content-type']);
    }

    if (downloadedSize === originalSize) {
      console.log('✓ Downloaded file size matches original file');
    } else {
      console.warn('⚠ File size mismatch:');
      console.log('  Original:', (originalSize / 1024).toFixed(2), 'KB');
      console.log('  Downloaded:', (downloadedSize / 1024).toFixed(2), 'KB');
    }

    // Compare file signatures
    const originalBuffer = fs.readFileSync(PDF_PATH);
    const originalStart = originalBuffer.slice(0, 10).toString('hex');
    const downloadedStart = Buffer.from(response.data).slice(0, 10).toString('hex');
    
    console.log('\nFile signatures:');
    console.log('Original:', originalStart);
    console.log('Downloaded:', downloadedStart);
    
    if (originalStart === downloadedStart) {
      console.log('✓ File signatures match');
    } else {
      console.warn('⚠ File signatures differ');
    }

    // Save a copy of the downloaded file for manual verification
    const testDownloadPath = path.join(__dirname, '../public/test-download.pdf');
    fs.writeFileSync(testDownloadPath, Buffer.from(response.data));
    console.log('\nTest download saved to:', testDownloadPath);

    console.log('\nDownload test completed!');
  } catch (error: any) {
    console.error('\nTest failed with error:');
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      if (error.response.data instanceof Buffer) {
        console.error('Response data (first 100 bytes):', error.response.data.slice(0, 100).toString('hex'));
      } else {
        console.error('Response data:', error.response.data);
      }
    } else {
      console.error(error.message);
    }
    process.exit(1);
  }
}

// Run the test
testDownload(); 