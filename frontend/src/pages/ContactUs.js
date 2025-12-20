import React from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTitle'

const ContactUs = () => {
  useTitle('Contact Us')
  return (
    <div className="bg-[#dee2e6] min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#003566] mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-slate-700">
            We're here to help—get in touch anytime
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
            <h2 className="text-2xl font-semibold text-[#003566] mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-800">Email</h3>
                <p className="text-slate-600">info.virtualstore@gmail.com</p>
                <p className="text-sm text-slate-500 mt-1">We respond within 24 hours</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-800">Phone</h3>
                <p className="text-slate-600">+92 (800) 123-4567</p>
                <p className="text-sm text-slate-500 mt-1">Mon–Sat: 9:00 AM – 6:00 PM (PKT)</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-800">Business Hours</h3>
                <p className="text-slate-600">Monday – Saturday: 9:00 AM – 6:00 PM</p>
                <p className="text-slate-600">Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Simple Form Placeholder */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-[#003566] mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#003566]"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#003566]"
                required
              />
              <textarea
                placeholder="Your Message"
                rows="6"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#003566]"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-[#003566] text-white font-semibold py-3 rounded-lg hover:bg-[#1976d2] transition"
              >
                Send Message
              </button>
            </form>
            <p className="text-sm text-slate-500 mt-4">* We'll get back to you as soon as possible</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/" className="text-[#003566] hover:underline text-lg">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;