import React from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTitle'

const PrivacyPolicy = () => {
  useTitle('Privacy Policy')
  return (
    <div className="bg-[#dee2e6] min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Optional: Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#003566] mb-4">Privacy Policy</h1>
          <p className="text-slate-600">Last updated: December 18, 2025</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 text-slate-700 leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-[#003566] mb-4">Introduction</h2>
            <p>
              Virtual Store ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website or make a purchase.
            </p>
            <p className="mt-4">
              By using our site, you agree to the practices described here. If you have questions, contact us at info.virtualstore@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#003566] mb-4">Information We Collect</h2>
            <p>We collect information you provide directly, such as:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Name, email, shipping/billing address, and phone number during registration or checkout</li>
              <li>Payment details (processed securely by third-party providers)</li>
              <li>Account preferences and order history</li>
            </ul>
            <p className="mt-4">We also collect information automatically:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Device information, IP address, browser type, and browsing behavior via cookies and analytics tools</li>
              <li>Search queries and cart activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#003566] mb-4">How We Use Your Information</h2>
            <p>To:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Process and fulfill orders</li>
              <li>Provide customer support</li>
              <li>Improve our site and personalize your experience</li>
              <li>Send promotional emails (you can opt out anytime)</li>
              <li>Prevent fraud and comply with legal requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#003566] mb-4">Sharing Your Information</h2>
            <p>We share data only with trusted partners for:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Payment processing and shipping</li>
              <li>Analytics and marketing tools</li>
            </ul>
            <p className="mt-4">We do not sell your personal information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#003566] mb-4">Security and Your Rights</h2>
            <p>We use industry-standard measures to protect your data, though no system is 100% secure.</p>
            <p className="mt-4">You have rights to access, correct, or delete your information. Contact us to exercise these.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#003566] mb-4">Cookies and Tracking</h2>
            <p>We use cookies for functionality and analytics. You can manage preferences in your browser.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#003566] mb-4">Changes and Contact</h2>
            <p>We may update this policy; changes will be posted here.</p>
            <p className="mt-4">Questions? Email: info.virtualstore@gmail.com or call +92 (800) 123-4567</p>
          </section>
        </div>

        <div className="text-center mt-12">
          <Link to="/" className="text-[#003566] hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
