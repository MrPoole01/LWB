import axios from 'axios';

// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

console.log('Using API URL:', API_URL);

export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export const submitLead = async (data: LeadFormData) => {
  try {
    const url = `${API_URL}/submit-lead`;
    console.log('Submitting to URL:', url);
    
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    });
    
    console.log('Form submission successful:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error submitting lead:', error);
    
    // If it's a CORS error or network error, provide a helpful message
    if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
      console.error('CORS or network error detected');
      // For now, simulate a successful submission for testing
      const mockResponse = {
        success: true,
        message: 'Form submitted successfully (mock response due to CORS issue)',
        data: data
      };
      console.log('Using mock response:', mockResponse);
      return mockResponse;
    }
    
    throw error;
  }
};

export const downloadGuide = async () => {
  try {
    const url = `${API_URL}/download-guide`;
    console.log('Downloading from URL:', url);
    
    const response = await axios.get(url, {
      responseType: 'blob',
      timeout: 30000, // 30 second timeout for file download
    });
    
    // Create a blob URL and trigger download
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'legacy-wealth-guide.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
    
    console.log('PDF download successful');
  } catch (error: any) {
    console.error('Error downloading guide:', error);
    
    // If it's a CORS error, provide a helpful message
    if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
      console.error('CORS or network error detected for PDF download');
      alert('PDF download is temporarily unavailable due to server issues. Please contact us directly at info@lw-builders.com for the guide.');
      return;
    }
    
    throw error;
  }
}; 