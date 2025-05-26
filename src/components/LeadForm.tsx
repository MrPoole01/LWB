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
    phone: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Submit the form data
      await submitLead(formData);
      
      // Call the parent onSubmit if provided
      if (onSubmit) {
        onSubmit(formData);
      }
      
      // Download the guide
      await downloadGuide();
      
      setSubmitted(true);
    } catch (err) {
      setError('There was an error submitting your information. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (submitted) {
    return (
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-serif font-medium text-[#1A2744] mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-6">
          Your Legacy Wealth Guide to Precious Metals has been downloaded.
          We've also sent a copy to your email for future reference.
        </p>
        <Button 
          type="primary" 
          onClick={() => downloadGuide()}
          className="mt-4"
        >
          Download Guide Again
        </Button>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="bg-white p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-serif font-medium text-[#1A2744] mb-2 text-center">
        Get Your Free Legacy Wealth Guide to Precious Metals
      </h3>
      <p className="text-gray-600 mb-6 text-center">
        Learn how to protect your wealth from inflation with precious metals
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-gray-700 mb-1">First Name*</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-gray-700 mb-1">Last Name*</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">Email Address*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
          />
        </div>
        
        <Button 
          type="primary" 
          fullWidth 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Get My Free Guide Now'}
        </Button>
        
        <p className="text-xs text-gray-500 mt-4 text-center">
          By submitting this form, you agree to our <a href="#" className="underline">Privacy Policy</a> and 
          consent to receive marketing communications from Legacy Wealth Builders.
        </p>
      </form>
    </motion.div>
  );
};

export default LeadForm;