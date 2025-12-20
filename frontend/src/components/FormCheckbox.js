import React from 'react';

const FormCheckbox = ({ label, checked, onChange, name }) => {
  return (
    <label className='flex items-center gap-3 cursor-pointer group'>
      <div className='relative flex items-center justify-center'>
        <input
          type='checkbox'
          name={name}
          checked={checked}
          onChange={onChange}
          className='w-5 h-5 rounded border-2 border-slate-300 accent-tech-blue cursor-pointer appearance-none transition-all duration-200 hover:border-tech-blue focus:outline-none focus:ring-2 focus:ring-tech-blue focus:ring-offset-2'
        />
      </div>
      <span className='text-sm text-slate-700 group-hover:text-slate-900 transition-colors'>
        {label}
      </span>
    </label>
  );
};

export default FormCheckbox;
