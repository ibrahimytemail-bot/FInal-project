import React from 'react';

const AuthButton = ({ 
  children, 
  isLoading = false, 
  disabled = false,
  type = 'submit',
  variant = 'primary',
  fullWidth = true,
  className = '',
  onClick
}) => {
  const baseStyles = 'font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm';
  
  const variants = {
    primary: 'bg-tech-blue hover:bg-tech-blue-dark text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-900 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'bg-transparent text-tech-blue hover:bg-tech-blue-light hover:text-tech-blue-dark disabled:opacity-50 disabled:cursor-not-allowed'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={isLoading || disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
    >
      {isLoading ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default AuthButton;
