import React, { useContext, useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import InputField from './InputField';
import FormCheckbox from './FormCheckbox';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const validateForm = () => {
    const newErrors = {};

    if (!data.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!data.password) {
      newErrors.password = 'Password is required';
    } else if (data.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const dataResponse = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message || 'Login successful!');
        // Store remember me preference
        if (rememberMe) {
          localStorage.setItem('rememberEmail', data.email);
        } else {
          localStorage.removeItem('rememberEmail');
        }
        navigate('/');
        fetchUserDetails();
        fetchUserAddToCart();
      } else {
        toast.error(dataApi.message || 'Invalid credentials');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
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
        placeholder='Enter your password'
        value={data.password}
        onChange={handleOnChange}
        icon={Lock}
        rightIcon={showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
        onRightIconClick={() => setShowPassword(!showPassword)}
        error={errors.password}
      />

      {/* Remember Me & Forgot Password */}
      <div className='flex items-center justify-between'>
        <FormCheckbox
          name='rememberMe'
          label='Remember me'
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <Link
          to='/forgot-password'
          className='text-sm font-medium text-tech-blue hover:text-tech-blue-dark transition-colors'
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        disabled={loading}
        className='w-full py-3 px-4 bg-gradient-to-r from-tech-blue to-tech-blue-dark text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-hover hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed'
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>

      {/* Sign Up Link */}
      <p className='text-center text-slate-600'>
        Don't have an account?{' '}
        <Link
          to='/sign-up'
          className='font-semibold text-tech-blue hover:text-tech-blue-dark transition-colors'
        >
          Create one
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
