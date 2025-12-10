import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#5C5CFF] hover:bg-[#4a4aff] text-white rounded-full px-6 py-3 shadow-[0_0_20px_-5px_#5C5CFF]",
    secondary: "bg-white text-black hover:bg-gray-200 rounded-full px-6 py-3",
    ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/10 rounded-lg p-2",
    icon: "bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-md"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
