import axios from 'axios';

const API_URL = 'https://legacy-wealth-api.onrender.com';

async function testAPI() {
  try {
    console.log('Testing API endpoints...\n');

    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_URL}/health`);
    console.log('✓ Health check:', healthResponse.data);

    // Test form submission
    console.log('\n2. Testing form submission...');
    const formData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '123-456-7890'
    };

    const submitResponse = await axios.post(`${API_URL}/api/submit-lead`, formData, {
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://legacywealthbuilders.org'
      }
    });
    console.log('✓ Form submission:', submitResponse.data);

    // Test PDF download
    console.log('\n3. Testing PDF download...');
    const downloadResponse = await axios.get(`${API_URL}/api/download-guide`, {
      responseType: 'arraybuffer',
      headers: {
        'Origin': 'https://legacywealthbuilders.org'
      }
    });
    console.log('✓ PDF download successful, size:', downloadResponse.data.byteLength, 'bytes');

    console.log('\n✅ All tests passed!');
  } catch (error: any) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    }
  }
}

testAPI(); 