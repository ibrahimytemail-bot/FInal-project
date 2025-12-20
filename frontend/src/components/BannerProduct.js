import React, { useEffect, useState, useCallback } from 'react'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6"

// Import local banner images
import banner1 from '../assest/banner/img1.jpeg'
import banner2 from '../assest/banner/img2.jpeg'
import banner3 from '../assest/banner/img3.jpeg'
import banner4 from '../assest/banner/img4.jpeg'
import banner5 from '../assest/banner/img5.jpeg'

import banner1Mobile from '../assest/banner/img1_mobile.jpg'
import banner2Mobile from '../assest/banner/img2_mobile.webp'
import banner3Mobile from '../assest/banner/img3_mobile.jpg'
import banner4Mobile from '../assest/banner/img4_mobile.jpg'
import banner5Mobile from '../assest/banner/img5_mobile.png'

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)

    // Use local banner images
    const bannerImages = {
        desktop: [banner1, banner2, banner3, banner4, banner5],
        mobile: [banner1Mobile, banner2Mobile, banner3Mobile, banner4Mobile, banner5Mobile]
    }

    const nextImage = useCallback(() => {
        if (bannerImages.desktop && bannerImages.desktop.length > 0) {
            setCurrentImage(prev => {
                if (prev >= bannerImages.desktop.length - 1) {
                    return 0
                }
                return prev + 1
            })
        }
    }, [currentImage, bannerImages.desktop])

    const preveImage = () => {
        if (bannerImages.desktop && bannerImages.desktop.length > 0) {
            setCurrentImage(prev => {
                if (prev <= 0) {
                    return bannerImages.desktop.length - 1
                }
                return prev - 1
            })
        }
    }

    useEffect(() => {
        if (!bannerImages.desktop || bannerImages.desktop.length === 0) return

        const interval = setInterval(() => {
            if (bannerImages.desktop.length - 1 > currentImage) {
                nextImage()
            } else {
                setCurrentImage(0)
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [currentImage, bannerImages, nextImage])

    return (
        <div className='w-full relative'>
            <div className='h-[400px] md:h-[600px] w-full bg-gradient-to-b from-blue-100 to-slate-50 relative overflow-hidden'>
                {/* Navigation arrows with improved styling */}
                <div className='absolute z-20 h-full w-full flex items-center pointer-events-none'>
                    <div className='container mx-auto flex justify-between'>
                        <button 
                            onClick={preveImage} 
                            className='pointer-events-auto p-3 md:p-4'>
                            <FaAngleLeft className='text-3xl hover:text-white md:text-4xl text-gray-500' />
                        </button>
                        <button 
                            onClick={nextImage} 
                            className='pointer-events-auto p-3 md:p-4'
                        >
                            <FaAngleRight className='text-3xl hover:text-white md:text-4xl text-gray-500' />
                        </button>
                    </div>
                </div>

                {/* Desktop version */}
                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {bannerImages.desktop.map((imageUrl, index) => (
                        <div 
                            className='w-72 h-72 min-w-full min-h-full transition-transform duration-700 ease-in-out relative' 
                            key={imageUrl} 
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageUrl} alt={`Banner ${index + 1}`} className='w-full h-full object-cover' />
                            {/* Enhanced gradient overlay */}
                            <div className='absolute inset-0 bg-gradient-to-b from-white/0 via-white/5 to-white/50 pointer-events-none'></div>
                        </div>
                    ))}
                </div>

                {/* Mobile version */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {bannerImages.mobile.map((imageUrl, index) => (
                        <div 
                            className='w-full h-full min-w-full min-h-full transition-transform duration-700 ease-in-out relative' 
                            key={imageUrl} 
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageUrl} alt={`Banner ${index + 1}`} className='w-full h-full object-cover' />
                            {/* Enhanced gradient overlay */}
                            <div className='absolute inset-0 bg-gradient-to-b from-white/0 via-white/10 to-white/40 pointer-events-none'></div>
                        </div>
                    ))}
                </div>

                {/* Slide indicators */}
                <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10'>
                    {bannerImages.desktop.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImage(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === currentImage 
                                    ? 'bg-tech-blue w-8' 
                                    : 'bg-white/40 w-2 hover:bg-white/60'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BannerProduct
