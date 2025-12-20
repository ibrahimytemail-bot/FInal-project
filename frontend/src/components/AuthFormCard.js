import React from 'react';

const AuthFormCard = ({ children, title, subtitle, logo = true }) => {
  return (
    <div className="bg-white rounded-2xl shadow-glass backdrop-blur-md border border-slate-200 p-8 w-full">
      {/* Header */}
      <div className="text-center mb-8">
        {logo && (
          <div className="mb-4 flex justify-center">
            <img 
              src="https://i.ibb.co/QFMv4DMN/logo.png" 
              alt="Saltiam Logo" 
              className="w-20 h-20 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-heading">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-600 text-sm leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Form Content */}
      {children}
    </div>
  );
};

export default AuthFormCard;
