import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import AuthLayout from '../components/AuthLayout';
import AuthFormCard from '../components/AuthFormCard';
import AuthButton from '../components/AuthButton';
import OTPInput from '../components/OTPInput';
import useTitle from '../hooks/useTitle'

const VerifyOTP = () => {
  useTitle('Verify OTP')
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
    if (errors.otp) {
      setErrors(prev => ({ ...prev, otp: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      setErrors(prev => ({ ...prev, otp: 'Please enter a 6-digit OTP' }));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(SummaryApi.verifyOTP.url, {
        method: SummaryApi.verifyOTP.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || "OTP verified successfully");
        navigate("/change-password", { state: { email } });
      } else {
        setErrors(prev => ({ ...prev, otp: data.message || 'Invalid OTP' }));
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Verify OTP Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResending(true);
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
        toast.success("OTP resent successfully");
        setOtp('');
        setErrors({});
      } else {
        toast.error(data.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error("Failed to resend OTP");
      console.error("Resend OTP Error:", error);
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <AuthLayout backgroundVariant="alt">
      <AuthFormCard
        title="Verify Your Email"
        subtitle={`We sent a 6-digit code to ${email}. Please check your inbox.`}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <OTPInput
            label="Verification Code"
            value={otp}
            onChange={handleOTPChange}
            error={errors.otp}
          />

          <AuthButton isLoading={loading} disabled={otp.length !== 6}>
            Verify & Continue
          </AuthButton>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-center text-slate-600 text-sm mb-4">
            Didn't receive the code?
          </p>
          <AuthButton
            variant="secondary"
            onClick={handleResendOTP}
            isLoading={resending}
            disabled={resending}
          >
            Resend OTP
          </AuthButton>
        </div>
      </AuthFormCard>
    </AuthLayout>
  );
};

export default VerifyOTP;
