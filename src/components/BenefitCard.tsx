import React from 'react';
import { motion } from 'framer-motion';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="text-[#D4AF37] mb-4">{icon}</div>
      <h3 className="text-xl font-serif font-medium text-[#1A2744] mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default BenefitCard;