import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Eye, Lock, Database, FileText, AlertCircle } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-[#F5F5F0] min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#1A2744] to-[#2A3754] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <Shield size={60} className="text-[#D4AF37]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="prose prose-lg max-w-none">
              <div className="mb-8 text-sm text-gray-600">
                <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start">
                  <Eye size={24} className="text-[#D4AF37] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#1A2744] mb-4">Information We Collect</h2>
                    <p className="text-gray-700 mb-4">
                      We collect information you provide directly to us, such as when you:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Request our free precious metals guide</li>
                      <li>Subscribe to our newsletter</li>
                      <li>Contact us via email or other communication methods</li>
                      <li>Participate in surveys or promotions</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                      The types of information we may collect include your name, email address, phone number, 
                      and any other information you choose to provide.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Database size={24} className="text-[#D4AF37] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#1A2744] mb-4">How We Use Your Information</h2>
                    <p className="text-gray-700 mb-4">
                      We use the information we collect to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Provide you with our free guide and educational materials</li>
                      <li>Send you newsletters and updates about precious metals investing</li>
                      <li>Respond to your comments, questions, and requests</li>
                      <li>Improve our website and services</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <Lock size={24} className="text-[#D4AF37] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#1A2744] mb-4">Information Sharing and Disclosure</h2>
                    <p className="text-gray-700 mb-4">
                      We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>With your explicit consent</li>
                      <li>To comply with legal requirements or protect our rights</li>
                      <li>With trusted service providers who help us operate our website (under strict confidentiality agreements)</li>
                      <li>In connection with a merger, acquisition, or sale of assets</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <FileText size={24} className="text-[#D4AF37] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#1A2744] mb-4">Data Security</h2>
                    <p className="text-gray-700">
                      We implement appropriate technical and organizational security measures to protect your personal 
                      information against unauthorized access, alteration, disclosure, or destruction. However, no method 
                      of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee 
                      absolute security.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <AlertCircle size={24} className="text-[#D4AF37] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#1A2744] mb-4">Your Rights and Choices</h2>
                    <p className="text-gray-700 mb-4">
                      You have the right to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Access and update your personal information</li>
                      <li>Opt out of receiving promotional emails</li>
                      <li>Request deletion of your personal information</li>
                      <li>Lodge a complaint with relevant data protection authorities</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                      To exercise these rights, please contact us at 
                      <a href="mailto:info@lw-builders.com" className="text-[#D4AF37] hover:underline ml-1">
                        info@lw-builders.com
                      </a>.
                    </p>
                  </div>
                </div>

                <div className="border-t pt-8">
                  <h2 className="text-2xl font-serif font-bold text-[#1A2744] mb-4">Contact Us</h2>
                  <p className="text-gray-700">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 rounded">
                    <p className="text-gray-700">
                      <strong>Legacy Wealth Builders</strong><br />
                      Email: <a href="mailto:info@lw-builders.com" className="text-[#D4AF37] hover:underline">info@lw-builders.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 