import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, FaSignInAlt, FaUserPlus, FaShoppingCart, FaSearch, 
  FaInfoCircle, FaEnvelope, FaQuestionCircle, FaLock, FaFileAlt,
  FaBoxOpen, FaListUl
} from 'react-icons/fa';
import { MdHeadset, MdTv, MdCategory } from "react-icons/md";
import { FaHeadphones, FaMicrochip, FaPrint, FaCamera } from "react-icons/fa";
import { BsSmartwatch, BsMouse } from "react-icons/bs";
import { IoVolumeHigh } from "react-icons/io5";
import { TbFridge, TbDeviceMobile, TbMoustache } from "react-icons/tb";
import useTitle from '../hooks/useTitle'

const Sitemap = () => {
  useTitle('Site Map')
  const sections = [
    {
      title: "Main Navigation",
      icon: <FaHome className="text-2xl" />,
      items: [
        { name: "Home Page", link: "/", icon: <FaHome /> },
        { name: "Product Catalog", link: "/catalog", icon: <FaBoxOpen /> },
        { name: "Search Products", link: "/search", icon: <FaSearch /> },
        { name: "Shopping Cart", link: "/cart", icon: <FaShoppingCart /> },
        { name: "Checkout", link: "/checkout", icon: <FaFileAlt /> },
      ]
    },
    {
      title: "Account & Access",
      icon: <FaSignInAlt className="text-2xl" />,
      items: [
        { name: "Login", link: "/login", icon: <FaSignInAlt /> },
        { name: "Sign Up", link: "/sign-up", icon: <FaUserPlus /> },
        { name: "Forgot Password", link: "/forgot-password", icon: <FaLock /> },
      ]
    },
    {
      title: "Product Categories",
      icon: <MdCategory className="text-2xl" />,
      items: [
        { name: "Airpods", link: "/product-category?category=airpodes", icon: <MdHeadset /> },
        { name: "Wired Earphones", link: "/product-category?category=earphones", icon: <FaHeadphones /> },
        { name: "Smartphones", link: "/product-category?category=mobile", icon: <TbDeviceMobile /> },
        { name: "Smart TVs", link: "/product-category?category=televisions", icon: <MdTv /> },
        { name: "Trimmers", link: "/product-category?category=trimmers", icon: <TbMoustache /> },
        { name: "Processors", link: "/product-category?category=processor", icon: <FaMicrochip /> },
        { name: "Printers", link: "/product-category?category=printers", icon: <FaPrint /> },
        { name: "Smart Watches", link: "/product-category?category=watches", icon: <BsSmartwatch /> },
        { name: "Cameras", link: "/product-category?category=camera", icon: <FaCamera /> },
        { name: "Speakers", link: "/product-category?category=speakers", icon: <IoVolumeHigh /> },
        { name: "Refrigerators", link: "/product-category?category=refrigerator", icon: <TbFridge /> },
        { name: "Computer Mouse", link: "/product-category?category=Mouse", icon: <BsMouse /> },
      ]
    },
    {
      title: "Support & Legal",
      icon: <FaInfoCircle className="text-2xl" />,
      items: [
        { name: "About Us", link: "/about", icon: <FaInfoCircle /> },
        { name: "Contact Us", link: "/contactus", icon: <FaEnvelope /> },
        { name: "FAQ's", link: "/faqs", icon: <FaQuestionCircle /> },
        { name: "Privacy Policy", link: "/privacy-policy", icon: <FaLock /> },
        { name: "Terms & Conditions", link: "/terms-conditions", icon: <FaFileAlt /> },
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Site <span className="text-blue-600">Map</span>
          </h1>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A comprehensive overview of everything available at Virtual Store. 
            Easily navigate through our pages and categories.
          </p>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
                <span className="text-blue-400">{section.icon}</span>
                <h2 className="text-lg font-bold text-white">{section.title}</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link 
                        to={item.link} 
                        className="group flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors duration-200"
                      >
                        <span className="text-slate-400 group-hover:text-blue-500 transition-colors">
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="text-center mt-20">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-200"
          >
            <FaHome /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
