import React from "react";
import { Link } from 'react-router-dom';
import Logo from "./Logo.js";

const Footer = () => {
  return (
  

<footer className="bg-[#073b4c] pb-6 px-6 sm:px-10">
  <div className="max-w-7xl  mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10 text-center sm:text-left">

    {/* Company Info */}
    <div className="flex mt-10 flex-col items-center sm:items-start">
      <h3 className="text-white text-lg font-semibold mb-4">Company Info</h3>
      
      {/* Updated general e-commerce description */}
      <p className="-mb-12  text-gray-300 text-sm max-w-xs sm:max-w-none mb-4">
        Discover a wide range of quality products curated for your everyday needs. Shop with confidence and enjoy fast, reliable shipping.
      </p>
      {/* Logo moved to top with controlled spacing */}
      <div className="-mb-12 -mt-18">
      <Logo w={120}  />
      </div>
      
      <p className="text-gray-300 text-sm ">Email: info.virtualstore@gmail.com</p>
      <p className="mb-8 text-gray-300 text-sm">Phone: +92 (800) 123-4567</p>
    </div>

    {/* Follow Us */}
    <div className="flex mt-10 flex-col items-center sm:items-start">
      <h3 className="text-white text-lg font-semibold mb-2 sm:mb-4">Follow Us</h3>
      <p className="text-gray-300 text-sm text-center sm:text-left mb-4">
        Stay connected with us for offers, updates, and new products!
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center items-center">
        <Link>
          <img src="https://i.imghippo.com/files/JQkh7338XpI.png" alt="Facebook" className="w-10 h-10 bg-white sm:w-12 sm:h-12 md:w-12 md:h-12 p-0.5 rounded-full
          hover:scale-110 transition transform duration-200 hover:bg-cyan-600" />
        </Link>
        <Link>
          <img src="https://i.imghippo.com/files/tYvm7221I.png" alt="Twitter" className="w-10 h-10 bg-white sm:w-12 sm:h-12 md:w-12 md:h-12 p-0.5 rounded-full 
          hover:scale-110 transition transform duration-200 hover:bg-sky-400" />
        </Link>
        <Link>
          <img src="https://i.imghippo.com/files/ZwRj8958Ds.png" alt="Instagram" className="w-10 h-10 bg-white sm:w-12 sm:h-12 md:w-12 md:h-12 p-0.5 rounded-full 
          hover:scale-110 transition transform duration-200 hover:bg-red-500" />
        </Link>
        <Link>
          <img src="https://i.imghippo.com/files/UpjQ6232xM.png" alt="LinkedIn" className="w-10 h-10 bg-white sm:w-12 sm:h-12 md:w-12 md:h-12 p-0.5 rounded-full
           hover:scale-110 transition transform duration-200 hover:bg-lime-500" />
        </Link>
      </div>
    </div>

    {/* Customer Service */}
    <div className="flex mt-10 flex-col items-center sm:items-start">
      <h3 className="text-white text-lg font-semibold mb-4">Customer Service</h3>
      <ul className="space-y-2 text-sm">
        <li><Link to="/sitemap" className="text-gray-300 hover:text-gray-400 hover:underline">Site Map</Link></li>
        <li><Link to="/privacy-policy" className="text-gray-300 hover:text-gray-400 hover:underline">Privacy Policy</Link></li>
        <li><Link to="/terms-conditions" className="text-gray-300 hover:text-gray-400 hover:underline">Terms & Conditions</Link></li>
      </ul>
    </div>

    {/* Help */}
    <div className="flex mt-10 flex-col items-center sm:items-start">
      <h3 className="text-white text-lg font-semibold mb-4">Help</h3>
      <ul className="space-y-2 text-sm">
        <li><Link to="/faqs" className="text-gray-300 hover:text-gray-400 hover:underline">FAQ's</Link></li>
        <li><Link to="/about" className="text-gray-300 hover:text-gray-400 hover:underline">About Us</Link></li>
        <li><Link to="/contactus" className="text-gray-300 hover:text-gray-400 hover:underline">Contact Us</Link></li>
        <li><Link to="/catalog" className="text-gray-300 hover:text-gray-400 hover:underline">Catalog</Link></li>
      </ul>
    </div>

  </div>

  {/* Footer Bottom */}
  <div className="mt-10 mb-2 text-center text-sm text-white">
    <p>© 2025 Virtual store. All rights reserved.</p>
  </div>
</footer>

  );
};

export default Footer;