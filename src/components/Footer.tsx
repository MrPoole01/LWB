import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A2744] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <a href="/" className="flex items-center">
              <img src="/logo.png" alt="Legacy Wealth Builders" className="h-8 w-8 mr-2" />
              <span className="text-xl font-serif tracking-wider">Legacy Wealth Builders</span>
            </a>
          </div>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/profile.php?id=61576706432261" className="text-white hover:text-[#D4AF37] transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://x.com/legacywealth_" className="text-white hover:text-[#D4AF37] transition-colors">
              <Twitter size={20} />
            </a>
            <a href="https://www.instagram.com/legacywealth_5280/" className="text-white hover:text-[#D4AF37] transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-sm text-gray-400">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <h3 className="text-white font-medium mb-2">Contact Us</h3>
              <p>info@lw-builders.com</p>
              <p>1-800-555-1234</p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">Quick Links</h3>
              <ul>
                <li><a href="#" className="hover:text-[#D4AF37]">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#D4AF37]">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#D4AF37]">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">Disclaimer</h3>
              <p>Investment in precious metals involves risk. Past performance is not indicative of future results.</p>
            </div>
          </div>
          
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} Legacy Wealth Builders. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;