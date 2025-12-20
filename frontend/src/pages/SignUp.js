import React from 'react';
import { Zap } from 'lucide-react';
import SignUpForm from '../components/SignUpForm';
import useTitle from '../hooks/useTitle'

const SignUp = () => {
  useTitle('Sign Up')
  return (
    <section id='signup' className='min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-slate-50 via-tech-blue-light to-slate-50'>
     
      <div className='relative w-full max-w-md'>
        {/* Card Container */}
        <div className='bg-white rounded-2xl shadow-glass border border-white/20 backdrop-blur-lg p-8 md:p-10'>
          {/* Header */}
          <div className='mb-8 text-center'>
            <div className='inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-tech-blue to-tech-blue-dark rounded-xl mb-4 shadow-lg'>
              <Zap className='w-8 h-8 text-white' strokeWidth={2.5} />
            </div>
            <h1 className='text-3xl font-bold text-slate-900 mb-2'>Get Started</h1>
            <p className='text-slate-600'>Create your account in just a few steps</p>
          </div>

          {/* Sign Up Form */}
          <SignUpForm />

          {/* Divider */}
          <div className='mt-8 pt-8 border-t border-slate-200 text-center text-xs text-slate-500'>
            <p>By creating an account, you agree to our <a href='#' className='text-tech-blue hover:underline'>Terms of Service</a> and <a href='#' className='text-tech-blue hover:underline'>Privacy Policy</a></p>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className='mt-6 text-center'>
          <p className='text-slate-600 text-sm'>
            Questions?{' '}
            <a href='#' className='text-tech-blue font-semibold hover:underline'>
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
