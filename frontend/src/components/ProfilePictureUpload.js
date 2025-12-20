import React, { useRef } from 'react';
import { Upload, User } from 'lucide-react';

const ProfilePictureUpload = ({ profilePic, onUpload }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='flex flex-col items-center gap-4 mb-8'>
      <div className='relative group'>
        {/* Profile Picture Circle */}
        <div className='w-24 h-24 rounded-full bg-gradient-to-br from-tech-blue-light to-slate-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg'>
          {profilePic ? (
            <img 
              src={profilePic} 
              alt='Profile' 
              className='w-full h-full object-cover'
            />
          ) : (
            <User className='w-12 h-12 text-tech-blue' strokeWidth={1.5} />
          )}
        </div>

        {/* Upload Button Overlay */}
        <button
          type='button'
          onClick={handleClick}
          className='absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100'
        >
          <Upload className='w-6 h-6 text-white' strokeWidth={2} />
        </button>
      </div>

      {/* File Input */}
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={onUpload}
        className='hidden'
      />

      {/* Upload Text */}
      <div className='text-center'>
        <p className='text-sm font-medium text-slate-700'>Profile Picture</p>
        <p className='text-xs text-slate-500 cursor-pointer hover:text-tech-blue' onClick={handleClick}>
          Click to upload or drag and drop
        </p>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
