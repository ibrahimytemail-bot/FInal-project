import React from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTitle'

const TermsConditions = () => {
  useTitle('Terms & Conditions')
  return (
    <div className="bg-[#dee2e6] min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#003566] mb-4">Terms & Conditions</h1>
          <p className="text-slate-600">Last updated: December 18, 2025</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 text-slate-700 leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-[#003566] mb-4">Acceptance of Terms</h2>
            <p>By accessing or using Virtual Store, you agree to these Terms & Conditions. If you disagree, please do not use our site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#003566] mb-4">Orders and Payments</h2>
            <p>We accept payments in multiple currencies. Prices may change without notice. Orders are subject to availability and acceptance.</p>
            <p className="mt-4">You warrant that all information provided is accurate.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#003566] mb-4">Shipping and Delivery</h2>
            <p>We ship worldwide where possible. Delivery times are estimates; we are not liable for delays.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#003566] mb-4">Returns and Refunds</h2>
            <p>Returns accepted within 14 days for unused items. Refunds processed to original payment method.</p>
            <p className="mt-4">Certain items (e.g., software, personalized products) may be non-returnable.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#003566] mb-4">Product Warranties and Liability</h2>
            <p>Products come with manufacturer warranties where applicable. We disclaim liability for indirect damages.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#003566] mb-4">Intellectual Property</h2>
            <p>All site content is owned by Virtual Store. Unauthorized use is prohibited.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#003566] mb-4">Governing Law</h2>
            <p>These terms are governed by the laws of Pakistan.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#003566] mb-4">Contact Us</h2>
            <p>For questions: info.virtualstore@gmail.com</p>
          </section>
        </div>

        <div className="text-center mt-12">
          <Link to="/" className="text-[#003566] hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
