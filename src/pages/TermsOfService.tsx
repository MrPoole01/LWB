import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Scale, FileText, AlertTriangle, Users, Gavel, Shield } from 'lucide-react';

const TermsOfService: React.FC = () => {
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
              <Scale size={60} className="text-[#D4AF37]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using our services and accessing our educational materials.
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
                  <FileText size={24} className="text-[#D4AF37] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#1A2744] mb-4">Acceptance of Terms</h2>
                    <p className="text-gray-700">
                      By accessing and using the Legacy Wealth Builders website and services, you accept and agree to be 
                      bound by the terms and provision of this agreement. If you do not agree to abide by the above, 
                      please do not use this service.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users size={24} className="text-[#D4AF37] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#1A2744] mb-4">Use License</h2>
                    <p className="text-gray-700 mb-4">
                      Permission is granted to temporarily download one copy of the materials on Legacy Wealth Builders' 
                      website for personal, non-commercial transitory viewing only. This is the grant of a license, not a 
                      transfer of title, and under this license you may not:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Modify or copy the materials</li>
                      <li>Use the materials for any commercial purpose or for any public display</li>
                      <li>Attempt to reverse engineer any software contained on the website</li>
                      <li>Remove any copyright or other proprietary notations from the materials</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <AlertTriangle size={24} className="text-[#D4AF37] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#1A2744] mb-4">Investment Disclaimer</h2>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                      <p className="text-gray-700 font-medium">
                        <strong>Important:</strong> The information provided by Legacy Wealth Builders is for educational 
                        purposes only and should not be considered as financial advice.
                      </p>
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Investment in precious metals involves risk and may not be suitable for all investors</li>
                      <li>Past performance is not indicative of future results</li>
                      <li>You should consult with a qualified financial advisor before making investment decisions</li>
                      <li>We are not a licensed investment advisor or financial planner</li>
                      <li>Market conditions can change rapidly and affect the value of precious metals</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <Shield size={24} className="text-[#D4AF37] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#1A2744] mb-4">Accuracy of Materials</h2>
                    <p className="text-gray-700">
                      The materials appearing on Legacy Wealth Builders' website could include technical, typographical, 
                      or photographic errors. We do not warrant that any of the materials on its website are accurate, 
                      complete, or current. We may make changes to the materials contained on its website at any time 
                      without notice.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Gavel size={24} className="text-[#D4AF37] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#1A2744] mb-4">Limitations</h2>
                    <p className="text-gray-700">
                      In no event shall Legacy Wealth Builders or its suppliers be liable for any damages (including, 
                      without limitation, damages for loss of data or profit, or due to business interruption) arising 
                      out of the use or inability to use the materials on Legacy Wealth Builders' website, even if 
                      Legacy Wealth Builders or a Legacy Wealth Builders authorized representative has been notified 
                      orally or in writing of the possibility of such damage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FileText size={24} className="text-[#D4AF37] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#1A2744] mb-4">Privacy Policy</h2>
                    <p className="text-gray-700">
                      Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your 
                      information when you use our services. By using our services, you agree to the collection and use 
                      of information in accordance with our Privacy Policy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Scale size={24} className="text-[#D4AF37] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#1A2744] mb-4">Governing Law</h2>
                    <p className="text-gray-700">
                      These terms and conditions are governed by and construed in accordance with the laws of the 
                      United States and you irrevocably submit to the exclusive jurisdiction of the courts in that 
                      state or location.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FileText size={24} className="text-[#D4AF37] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#1A2744] mb-4">Changes to Terms</h2>
                    <p className="text-gray-700">
                      We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
                      posting on the website. Your continued use of the service after changes are posted constitutes 
                      acceptance of the modified terms.
                    </p>
                  </div>
                </div>

                <div className="border-t pt-8">
                  <h2 className="text-2xl font-serif font-bold text-[#1A2744] mb-4">Contact Information</h2>
                  <p className="text-gray-700">
                    If you have any questions about these Terms of Service, please contact us at:
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

export default TermsOfService; 