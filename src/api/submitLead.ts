import axios from 'axios';

// Use Netlify functions for form submission
const API_URL = import.meta.env.VITE_API_URL || '/.netlify/functions';

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
    
    // Provide helpful error message
    const errorMessage = error.response?.data?.message || 
                        'There was an error submitting your information. Please try again or contact us directly at info@lw-builders.com.';
    
    throw new Error(errorMessage);
  }
};

export const downloadGuide = async () => {
  try {
    // For now, just show a message since we're having backend issues
    console.log('PDF download requested');
    alert('Thank you for your submission! We will email you the PDF guide shortly. If you don\'t receive it within a few minutes, please contact us at info@lw-builders.com.');
    return;
  } catch (error: any) {
    console.error('Error downloading guide:', error);
    alert('PDF download is temporarily unavailable due to server issues. Please contact us directly at info@lw-builders.com for the guide.');
  }
}; 