import axios from 'axios';

// Simple API URL construction
const API_URL = 'http://localhost:3001/api';

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
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error submitting lead:', error);
    throw error;
  }
};

export const downloadGuide = async () => {
  try {
    const url = `${API_URL}/download-guide`;
    console.log('Downloading from URL:', url);
    const response = await axios.get(url, {
      responseType: 'blob'
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
  } catch (error) {
    console.error('Error downloading guide:', error);
    throw error;
  }
}; 