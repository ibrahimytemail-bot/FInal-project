import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import imageTobase64 from '../helpers/imageTobase64';
import InputField from './InputField';
import ProfilePictureUpload from './ProfilePictureUpload';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: '',
  });

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!data.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!data.password) {
      newErrors.password = 'Password is required';
    } else if (data.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imagePic = await imageTobase64(file);
        setData((prev) => ({
          ...prev,
          profilePic: imagePic,
        }));
      } catch (error) {
        toast.error('Failed to upload image');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message || 'Account created successfully!');
        navigate('/login');
      } else {
        toast.error(dataApi.message || 'Sign up failed');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
      {/* Profile Picture Upload */}
      <ProfilePictureUpload 
        profilePic={data.profilePic} 
        onUpload={handleUploadPic}
      />

      {/* Name Field */}
      <InputField
        type='text'
        name='name'
        label='Full Name'
        placeholder='Enter your full name'
        value={data.name}
        onChange={handleOnChange}
        icon={User}
        error={errors.name}
      />

      {/* Email Field */}
      <InputField
        type='email'
        name='email'
        label='Email Address'
        placeholder='Enter your email'
        value={data.email}
        onChange={handleOnChange}
        icon={Mail}
        error={errors.email}
      />

      {/* Password Field */}
      <InputField
        type={showPassword ? 'text' : 'password'}
        name='password'
        label='Password'
        placeholder='Create a strong password'
        value={data.password}
        onChange={handleOnChange}
        icon={Lock}
        rightIcon={showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
        onRightIconClick={() => setShowPassword(!showPassword)}
        error={errors.password}
      />

      {/* Confirm Password Field */}
      <InputField
        type={showConfirmPassword ? 'text' : 'password'}
        name='confirmPassword'
        label='Confirm Password'
        placeholder='Confirm your password'
        value={data.confirmPassword}
        onChange={handleOnChange}
        icon={Lock}
        rightIcon={showConfirmPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
        onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
        error={errors.confirmPassword}
      />

      {/* Password Requirements Info */}
      <div className='bg-tech-blue-light/30 border border-tech-blue-light rounded-lg p-3'>
        <p className='text-xs font-medium text-slate-700 mb-2'>Password must contain:</p>
        <ul className='text-xs text-slate-600 space-y-1'>
          <li className={data.password.length >= 8 ? 'text-green-600' : ''}>
            ✓ At least 8 characters
          </li>
          <li className={/[A-Z]/.test(data.password) ? 'text-green-600' : ''}>
            ✓ One uppercase letter
          </li>
          <li className={/[a-z]/.test(data.password) ? 'text-green-600' : ''}>
            ✓ One lowercase letter
          </li>
          <li className={/\d/.test(data.password) ? 'text-green-600' : ''}>
            ✓ One number
          </li>
        </ul>
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        disabled={loading}
        className='w-full py-3 px-4 bg-gradient-to-r from-tech-blue to-tech-blue-dark text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-hover hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed'
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>

      {/* Login Link */}
      <p className='text-center text-slate-600'>
        Already have an account?{' '}
        <Link
          to='/login'
          className='font-semibold text-tech-blue hover:text-tech-blue-dark transition-colors'
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
