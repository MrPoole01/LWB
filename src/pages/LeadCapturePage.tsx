import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Check, Lock } from 'lucide-react';
import { LeadFormData } from '../api/submitLead';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';

const LeadCapturePage: React.FC = () => {
  const handleFormSubmit = (data: LeadFormData) => {
    console.log('Form submitted:', data);
    // In a real application, you would send this data to your backend
  };
  
  return (
    <div className="bg-[#F5F5F0] min-h-screen">
      <Header />
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <motion.h1 
                className="text-3xl md:text-4xl font-serif font-bold text-[#1A2744] mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Get Your Free Guide to Gold & Silver
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Complete the form below to receive our comprehensive guide on how to protect 
                your wealth with precious metals.
              </motion.p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2">
                <LeadForm onSubmit={handleFormSubmit} />
                
                <div className="mt-6 flex items-center justify-center text-gray-600">
                  <Lock size={16} className="mr-2" />
                  <span className="text-sm">Your information is secure and will never be shared</span>
                </div>
              </div>
              
              <motion.div 
                className="lg:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="flex justify-center mb-6">
                    <FileText size={64} className="text-[#D4AF37]" />
                  </div>
                  
                  <h3 className="text-2xl font-serif font-medium text-[#1A2744] mb-4 text-center">
                    What You'll Discover Inside
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-100 mr-4">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <p>The historical performance of gold and silver during major economic crises</p>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-100 mr-4">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <p>Why precious metals are the ultimate shield against inflation</p>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-100 mr-4">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <p>How to start building your precious metals collection with as little as $1</p>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-100 mr-4">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <p>The best storage solutions to keep your metals safe</p>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-100 mr-4">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <p>Tax-advantaged ways to own precious metals</p>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-100 mr-4">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <p>Common mistakes to avoid when buying gold and silver</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                    <p className="italic text-gray-600 text-center">
                      "This guide provided exactly what I needed to start building my precious metals collection. 
                      The step-by-step approach made it easy to understand even as a beginner."
                    </p>
                    <p className="text-right mt-2 text-gray-700 font-medium">— Robert K.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LeadCapturePage;