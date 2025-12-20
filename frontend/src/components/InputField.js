import React from 'react';

const InputField = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  name,
  icon: Icon,
  rightIcon,
  onRightIconClick,
  error,
  disabled = false,
}) => {
  return (
    <div className='flex flex-col gap-2'>
      {label && (
        <label className='text-sm font-medium text-slate-700'>
          {label}
        </label>
      )}
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
        error 
          ? 'border-red-500 bg-red-50' 
          : 'border-slate-200 bg-slate-50 focus-within:border-tech-blue focus-within:bg-white'
      }`}>
        {Icon && (
          <Icon className='w-5 h-5 text-slate-400 flex-shrink-0' />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className='flex-1 outline-none bg-transparent text-slate-900 placeholder-slate-400 disabled:opacity-50'
        />
        {rightIcon && (
          <button
            type='button'
            onClick={onRightIconClick}
            className='text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0'
          >
            {rightIcon}
          </button>
        )}
      </div>
      {error && (
        <p className='text-sm text-red-600 font-medium'>{error}</p>
      )}
    </div>
  );
};

export default InputField;
