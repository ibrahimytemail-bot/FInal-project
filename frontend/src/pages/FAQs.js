import React from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTitle'

const FAQs = () => {
  useTitle('FAQ\'s')
  const faqs = [
    {
      question: "What is the delivery time?",
      answer: "Standard delivery takes 3-5 business days. Express delivery options are available at checkout."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive an email with a tracking number and a link to track your package."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 14-day return policy for unused items in their original packaging. Please visit our Returns page for more details."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to many countries worldwide. Shipping costs and delivery times vary by location."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach us via email at info.virtualstore@gmail.com or call us at +92 (800) 123-4567 during business hours."
    }
  ];

  return (
    <div className="bg-[#dee2e6] min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#003566] mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-700">
            Find answers to common questions about our services
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold text-[#003566] mb-4">{faq.question}</h3>
              <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/" className="text-[#003566] hover:underline text-lg">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
