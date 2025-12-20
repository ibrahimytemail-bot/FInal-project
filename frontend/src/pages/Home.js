import React from 'react'
import BannerProduct from '../components/BannerProduct'
import ProductGrid from '../components/ProductGrid'
import FeaturedProductSection from '../components/FeaturedProductSection'
import BestSellingProductSection from '../components/BestSellingProductSection'
import useTitle from '../hooks/useTitle'

const Home = () => {
  useTitle('Home - Best Electronics & Tech Store')
  return (
    <div className='bg-[#dee2e6] min-h-screen'>

      {/* Amazon-style Banner - acts as background */}
      <BannerProduct />

      {/*  First 4 product grods who are Overlapping on the banner */}
      <div className='container mx-auto px-4 -mt-64 md:-mt-75 relative z-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          <ProductGrid category="airpodes" heading="Top Airpods" />
          <ProductGrid category="watches" heading="Smart Watches" />
          <ProductGrid category="camera" heading="Cameras & Photography" />
          <ProductGrid category="earphones" heading="Earphones & Headphones" />
        </div>
      </div>

         {/* Spacing after overlapping cards */}
      <div className='pt-4 md:pt-8'></div>

      {/* Second Product Grid Section */}
      <div className='container mx-auto px-4 pt-6 pb-8'>
        <div className='mb-4'>
          <h2 className='text-2xl md:text-3xl font-bold text-slate-900 mb-1'>Computing & Peripherals</h2>
          <p className='text-slate-600 text-sm'>Everything you need for your workspace</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <ProductGrid category={"Mouse"} heading={"Computer Mouse"} />
          <ProductGrid category={"printers"} heading={"Printers"} />
          <ProductGrid category={"speakers"} heading={"Bluetooth Speakers"} />
          <ProductGrid category={"refrigerator"} heading={"Refrigerators"} />
        </div>
      </div>

      {/* Featured Products Section */}
      <div className='py-8 mt-6'>
        <FeaturedProductSection heading="Featured Products"/>
      </div>

      {/* Best Selling Products Section */}
      <div className='py-8'>
        <BestSellingProductSection heading="Best Selling Products"/>
      </div>
      
      {/* Third Product Grid Section */}
      <div className='container mx-auto px-4 pt-6 pb-8'>
        <div className='mb-4'>
          <h2 className='text-2xl md:text-3xl font-bold text-slate-900 mb-1'>More Categories</h2>
          <p className='text-slate-600 text-sm'>Explore our complete range of electronics</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <ProductGrid category={"processor"} heading={"Processors"} />
          <ProductGrid category={"trimmers"} heading={"Trimmers & Grooming"} />
          <ProductGrid category={"televisions"} heading={"Smart TVs"} />
          <ProductGrid category={"mobiles"} heading={"Smart Phones"} />
        </div>
      </div>
      
      {/* Spacing after overlapping cards */}
      <div className='pt-4 md:pt-8'></div>

    </div>

  )
}

export default Home
