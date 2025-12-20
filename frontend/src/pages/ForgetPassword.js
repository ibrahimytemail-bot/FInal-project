import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineMail } from 'react-icons/ai';
import SummaryApi from '../common';
import AuthLayout from '../components/AuthLayout';
import AuthFormCard from '../components/AuthFormCard';
import AuthButton from '../components/AuthButton';
import InputField from '../components/InputField';
import useTitle from '../hooks/useTitle'

const ForgetPassword = () => {
  useTitle('Forgot Password')
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(SummaryApi.forgotPassword.url, {
        method: SummaryApi.forgotPassword.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || "OTP sent to your email");
        navigate("/verify-otp", { state: { email } });
      } else {
        setErrors(prev => ({ 
          ...prev, 
          email: data.message || "Failed to send OTP" 
        }));
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Forgot Password Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthFormCard
        title="Forgot Password?"
        subtitle="Enter your email address and we'll send you a verification code"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            type="email"
            name="email"
            icon={AiOutlineMail}
            placeholder="name@example.com"
            value={email}
            onChange={handleChange}
            error={errors.email}
            disabled={loading}
          />

          <AuthButton isLoading={loading} disabled={!email}>
            Send Verification Code
          </AuthButton>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200 text-center">
          <p className="text-slate-600 text-sm">
            Remember your password?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-tech-blue font-semibold hover:text-tech-blue-dark transition-colors"
            >
              Back to Login
            </button>
          </p>
        </div>
      </AuthFormCard>
    </AuthLayout>
  );
};

export default ForgetPassword;
