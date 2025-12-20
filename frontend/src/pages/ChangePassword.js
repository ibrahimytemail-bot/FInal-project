import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineLock } from 'react-icons/ai';
import SummaryApi from '../common';
import AuthLayout from '../components/AuthLayout';
import AuthFormCard from '../components/AuthFormCard';
import AuthButton from '../components/AuthButton';
import PasswordInput from '../components/PasswordInput';
import useTitle from '../hooks/useTitle'

const ChangePassword = () => {
  useTitle('Change Password')
  const [data, setData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};

    const passwordError = validatePassword(data.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(SummaryApi.changePassword.url, {
        method: SummaryApi.changePassword.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email,
          password: data.password,
          confirmPassword: data.confirmPassword
        })
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message || "Password changed successfully");
        setData({ password: "", confirmPassword: "" });
        navigate("/login");
      } else {
        setErrors(prev => ({ 
          ...prev, 
          submit: responseData.message || 'Failed to change password' 
        }));
        toast.error(responseData.message || 'Failed to change password');
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Change Password Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <AuthLayout>
      <AuthFormCard
        title="Set New Password"
        subtitle="Create a strong password to secure your account"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <PasswordInput
            label="New Password"
            name="password"
            placeholder="Enter new password"
            value={data.password}
            onChange={handleChange}
            error={errors.password}
            minLength={6}
            showStrength={true}
            disabled={loading}
          />

          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={data.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            minLength={6}
            disabled={loading}
          />

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">{errors.submit}</p>
            </div>
          )}

          <AuthButton isLoading={loading} disabled={!data.password || !data.confirmPassword}>
            Update Password
          </AuthButton>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200 text-center">
          <p className="text-slate-600 text-sm">
            <button
              type="button"
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

export default ChangePassword;
