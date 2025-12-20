import React from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTitle'

const AboutUs = () => {
  useTitle('About Us')
  return (
    <div className="bg-[#dee2e6] min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#003566] mb-6">
            About Virtual Store
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            Your trusted destination for the latest in technology and electronics
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12 space-y-12">
          <section className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold text-[#003566] mb-6">Our Story</h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              Founded in 2023, Virtual Store began with a simple vision: to make premium technology accessible to everyone. 
              We noticed that many people struggled to find genuine, high-quality electronics at fair prices with reliable support.
            </p>
            <p className="mt-6 text-lg text-slate-700 leading-relaxed">
              Today, we proudly offer a curated selection of smartphones, laptops, audio devices, smart home gadgets, and more—from leading global brands to innovative newcomers—all backed by our commitment to authenticity and customer satisfaction.
            </p>
          </section>

          <section className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="bg-[#003566] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-xl font-semibold text-[#003566]">Genuine Products</h3>
              <p className="text-slate-600 mt-2">100% original items with manufacturer warranties</p>
            </div>
            <div className="text-center">
              <div className="bg-[#003566] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                🚀
              </div>
              <h3 className="text-xl font-semibold text-[#003566]">Fast Delivery</h3>
              <p className="text-slate-600 mt-2">Quick and secure shipping across supported regions</p>
            </div>
            <div className="text-center">
              <div className="bg-[#003566] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                💬
              </div>
              <h3 className="text-xl font-semibold text-[#003566]">Expert Support</h3>
              <p className="text-slate-600 mt-2">Friendly help whenever you need it</p>
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-3xl font-semibold text-[#003566] mb-6">Our Promise</h2>
            <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
              We believe technology should enhance lives, not complicate them. That's why we're here—not just to sell products, but to help you find the perfect tech that fits your needs and budget.
            </p>
          </section>
        </div>

        <div className="text-center mt-12">
          <Link to="/" className="text-[#003566] hover:underline text-lg">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;