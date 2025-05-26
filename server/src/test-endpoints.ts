import axios from 'axios';

const API_URL = 'http://localhost:3001';

async function testEndpoints() {
  try {
    // Test form submission
    console.log('Testing form submission...');
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      phone: '123-456-7890'
    };

    const submitResponse = await axios.post(`${API_URL}/api/submit-lead`, formData);
    console.log('Form submission response:', submitResponse.data);

    // Test PDF download
    console.log('\nTesting PDF download...');
    const downloadResponse = await axios.get(`${API_URL}/api/download-guide`, {
      responseType: 'blob'
    });
    console.log('PDF download successful, size:', downloadResponse.data.size, 'bytes');

    console.log('\nAll tests passed successfully!');
  } catch (error: any) {
    console.error('Test failed:', error.response?.data || error.message);
  }
}

// Run tests
testEndpoints(); 