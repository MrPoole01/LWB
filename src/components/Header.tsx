import React from 'react';
import { Shield, Phone, Mail } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#1A2744] text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-[#D4AF37] mr-2" />
          <span className="text-xl font-serif tracking-wider">Legacy Wealth Builders</span>
        </div>
        <div className="flex items-center">
          <Mail size={18} className="mr-2 text-[#D4AF37]" />
          <span className="hidden sm:inline">Contact us today:</span> 
          <a href="mailto:info@lw-builders.com" className="ml-2 text-[#D4AF37] hover:underline">info@lw-builders.com</a>
        </div>
      </div>
    </header>
  );
};

export default Header;