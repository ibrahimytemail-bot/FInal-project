import React from 'react';

const AuthLayout = ({ children, backgroundVariant = 'default' }) => {
  const backgroundStyles = {
    default: 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100',
    alt: 'bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50'
  };

  return (
    <div className={`min-h-screen ${backgroundStyles[backgroundVariant]} flex items-center justify-center px-4 py-8 relative overflow-hidden`}>
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-tech-blue opacity-5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-tech-blue opacity-5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
