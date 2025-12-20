import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const PasswordInput = ({ 
  label, 
  placeholder = "Enter password", 
  value, 
  onChange, 
  name,
  error,
  minLength = 6,
  showStrength = false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Simple password strength calculation
  const getPasswordStrength = (pwd) => {
    if (!pwd) return null;
    if (pwd.length < 6) return { level: 'weak', color: 'text-red-500', bg: 'bg-red-100' };
    if (pwd.length < 10) return { level: 'medium', color: 'text-yellow-500', bg: 'bg-yellow-100' };
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) {
      return { level: 'strong', color: 'text-green-500', bg: 'bg-green-100' };
    }
    return { level: 'medium', color: 'text-yellow-500', bg: 'bg-yellow-100' };
  };

  const strength = getPasswordStrength(value);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-semibold text-slate-900">
          {label}
        </label>
      )}
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all duration-200 bg-slate-50 ${
        error 
          ? 'border-red-500 focus-within:border-red-500' 
          : 'border-slate-200 focus-within:border-tech-blue focus-within:bg-white'
      }`}>
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          minLength={minLength}
          required
          className="flex-1 outline-none bg-transparent text-slate-900 placeholder-slate-400 text-sm"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-slate-500 hover:text-slate-700 transition-colors flex-shrink-0 text-lg"
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>

      {showStrength && strength && (
        <div className="flex items-center gap-2">
          <div className="text-xs font-medium text-slate-600">Strength:</div>
          <div className={`text-xs font-semibold ${strength.color}`}>
            {strength.level.toUpperCase()}
          </div>
          <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${strength.bg} transition-all duration-300`}
              style={{ width: value ? `${Math.min(100, (value.length / 15) * 100)}%` : '0%' }}
            ></div>
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};

export default PasswordInput;
