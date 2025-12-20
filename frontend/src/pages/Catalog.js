import React from 'react';
import { Link } from 'react-router-dom';
import { MdHeadset, MdTv } from "react-icons/md";
import { FaHeadphones, FaMicrochip, FaPrint, FaCamera } from "react-icons/fa";
import { BsSmartwatch, BsMouse } from "react-icons/bs";
import { IoVolumeHigh } from "react-icons/io5";
import { TbFridge, TbDeviceMobile, TbMoustache } from "react-icons/tb";
import useTitle from '../hooks/useTitle'

const Catalog = () => {
  useTitle('Product Catalog')
  const categories = [
    { name: "Airpods", icon: <MdHeadset className="w-10 h-10" />, link: "/product-category?category=airpodes" },
    { name: "Wired Earphones", icon: <FaHeadphones className="w-10 h-10" />, link: "/product-category?category=earphones" },
    { name: "Smartphones", icon: <TbDeviceMobile className="w-10 h-10" />, link: "/product-category?category=mobiles" },
    { name: "Smart TVs", icon: <MdTv className="w-10 h-10" />, link: "/product-category?category=televisions" },
    { name: "Trimmers", icon: <TbMoustache className="w-10 h-10" />, link: "/product-category?category=trimmers" },
    { name: "Processors", icon: <FaMicrochip className="w-10 h-10" />, link: "/product-category?category=processor" },
    { name: "Printers", icon: <FaPrint className="w-10 h-10" />, link: "/product-category?category=printers" },
    { name: "Smart Watches", icon: <BsSmartwatch className="w-10 h-10" />, link: "/product-category?category=watches" },
    { name: "Cameras", icon: <FaCamera className="w-10 h-10" />, link: "/product-category?category=camera" },
    { name: "Speakers", icon: <IoVolumeHigh className="w-10 h-10" />, link: "/product-category?category=speakers" },
    { name: "Refrigerators", icon: <TbFridge className="w-10 h-10" />, link: "/product-category?category=refrigerator" },
    { name: "Computer Mouse", icon: <BsMouse className="w-10 h-10" />, link: "/product-category?category=Mouse" },
  ];

  return (
    <div className="bg-[#dee2e6] min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#003566] mb-6">
            Our Catalog
          </h1>
          <p className="text-xl text-slate-700">
            Explore all categories of premium electronics
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.link}
              className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-[#003566] mb-4">
                {cat.icon}
              </div>
              <p className="text-center font-medium text-slate-800">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/" className="text-[#003566] hover:underline text-lg">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Catalog;