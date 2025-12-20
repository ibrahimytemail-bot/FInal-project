import React from 'react';
import { Zap } from 'lucide-react';
import LoginForm from '../components/LoginForm';
import useTitle from '../hooks/useTitle'

const Login = () => {
  useTitle('Login')
  return (
    <section id='login' className='min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-slate-50 via-tech-blue-light to-slate-50'>
     
      <div className='relative w-full max-w-md'>
        {/* Card Container */}
        <div className='bg-white rounded-2xl shadow-glass border border-white/20 backdrop-blur-lg p-8 md:p-10'>
          {/* Header */}
          <div className='mb-8 text-center'>
            <div className='inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-tech-blue to-tech-blue-dark rounded-xl mb-4 shadow-lg'>
              <Zap className='w-8 h-8 text-white' strokeWidth={2.5} />
            </div>
            <h1 className='text-3xl font-bold text-slate-900 mb-2'>Welcome Back</h1>
            <p className='text-slate-600'>Sign in to continue your shopping journey</p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Divider */}
          <div className='mt-8 pt-8 border-t border-slate-200 text-center text-xs text-slate-500'>
            <p>Secure login powered by Virtual Store Security</p>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className='mt-6 text-center'>
          <p className='text-slate-600 text-sm'>
            Need help?{' '}
            <a href='#' className='text-tech-blue font-semibold hover:underline'>
              Support Center
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
