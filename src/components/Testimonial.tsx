import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
  delay?: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  quote, 
  author, 
  role, 
  avatarUrl,
  delay = 0 
}) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-start mb-4">
        <Quote className="h-8 w-8 text-[#D4AF37]" />
      </div>
      <p className="text-gray-700 italic mb-6">{quote}</p>
      <div className="flex items-center">
        <img 
          src={avatarUrl} 
          alt={author} 
          className="w-12 h-12 rounded-full object-cover mr-4" 
        />
        <div>
          <p className="font-medium text-[#1A2744]">{author}</p>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonial;