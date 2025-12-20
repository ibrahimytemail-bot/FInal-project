import React from 'react';

const OTPInput = ({ 
  label,
  value, 
  onChange, 
  error,
  placeholder = "Enter 6-digit OTP"
}) => {
  const handleOTPChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    onChange({ target: { name: 'otp', value: val } });
  };

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label className="text-sm font-semibold text-slate-900">
          {label}
        </label>
      )}
      <input
        type="text"
        inputMode="numeric"
        maxLength="6"
        value={value}
        onChange={handleOTPChange}
        placeholder={placeholder}
        required
        className={`w-full text-center text-4xl font-bold tracking-widest px-4 py-4 rounded-lg border-2 transition-all duration-200 bg-slate-50 ${
          error 
            ? 'border-red-500 text-red-600' 
            : 'border-slate-200 text-tech-blue focus:border-tech-blue focus:bg-white'
        } outline-none focus:ring-0 placeholder-slate-300`}
      />
      {error && (
        <p className="text-sm text-red-600 font-medium text-center">{error}</p>
      )}
    </div>
  );
};

export default OTPInput;
