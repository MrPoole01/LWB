import React, { useState } from 'react';
import Button from './Button';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { submitLead, downloadGuide, LeadFormData } from '../api/submitLead';

interface LeadFormProps {
  onSubmit?: (data: LeadFormData) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [errors, setErrors] = useState<Partial<LeadFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<LeadFormData> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      console.log('Submitting form data:', formData);
      const response = await submitLead(formData);
      console.log('Form submission response:', response);
      
      setIsSubmitted(true);
      setSubmitMessage(response.message || 'Thank you! Your information has been submitted successfully.');
      
      // Call the onSubmit prop if provided
      if (onSubmit) {
        onSubmit(formData);
      }

      // Auto-download the guide after successful submission
      try {
        console.log('Attempting to download guide...');
        await downloadGuide();
      } catch (downloadError) {
        console.error('Guide download failed:', downloadError);
        // Don't show error to user since form submission was successful
      }

    } catch (error: any) {
      console.error('Form submission error:', error);
      setSubmitMessage('There was an error submitting your information. Please try again or contact us directly at info@lw-builders.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof LeadFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-lg p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
        <p className="text-gray-600 mb-6">{submitMessage}</p>
        <p className="text-sm text-gray-500">
          If the download doesn't start automatically, please contact us at{' '}
          <a href="mailto:info@lw-builders.com" className="text-blue-600 hover:underline">
            info@lw-builders.com
          </a>
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg p-8"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Get Your Free Guide
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number (Optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <Button
        type="primary"
        htmlType="submit"
        disabled={isSubmitting}
        fullWidth={true}
      >
        {isSubmitting ? 'Submitting...' : 'Get My Free Guide'}
      </Button>
      
      <p className="text-xs text-gray-500 mt-4 text-center">
        By submitting this form, you agree to receive emails from Legacy Wealth Builders. 
        You can unsubscribe at any time.
      </p>
    </motion.form>
  );
};

export default LeadForm;