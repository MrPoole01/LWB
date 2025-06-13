import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  className?: string;
  href?: string;
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = 'primary', 
  fullWidth = false,
  className = '',
  href,
  disabled = false,
  htmlType = 'button'
}) => {
  const baseStyles = "py-3 px-6 rounded-md font-medium transition-all duration-300 text-center";
  const widthStyles = fullWidth ? "w-full" : "";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  const typeStyles = {
    primary: "bg-[#D4AF37] text-[#1A2744] hover:bg-[#C9A22E] shadow-md hover:shadow-lg",
    secondary: "bg-[#1A2744] text-white hover:bg-[#2A3754] shadow-md hover:shadow-lg",
    outline: "bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A2744]"
  };
  
  const buttonElement = (
    <motion.button
      type={htmlType}
      className={`${baseStyles} ${typeStyles[type]} ${widthStyles} ${disabledStyles} ${className}`}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
  
  if (href) {
    return (
      <a href={href} className={`inline-block ${disabledStyles}`}>
        {buttonElement}
      </a>
    );
  }
  
  return buttonElement;
};

export default Button;