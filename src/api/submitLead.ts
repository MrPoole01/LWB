import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export const submitLead = async (data: LeadFormData) => {
  try {
    const response = await axios.post(`${API_URL}/api/submit-lead`, data);
    return response.data;
  } catch (error) {
    console.error('Error submitting lead:', error);
    throw error;
  }
};

export const downloadGuide = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/download-guide`, {
      responseType: 'blob'
    });
    
    // Create a blob URL and trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'legacy-wealth-guide.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading guide:', error);
    throw error;
  }
}; 