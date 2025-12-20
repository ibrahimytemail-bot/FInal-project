import React, { useContext, useEffect, useRef, useState } from 'react'
import displayCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import SummaryApi from '../common'

const FeaturedProductSection = ({heading}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(10).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const [isPaused, setIsPaused] = useState(false)

    const { fetchUserAddToCart, currency } = useContext(Context)

    const handleAddToCart = async(e, id) => {
       await addToCart(e, id)
       fetchUserAddToCart()
    }

    const fetchData = async() => {
        setLoading(true)
        try {
            const response = await fetch(SummaryApi.getFeaturedProduct.url)
            const dataResponse = await response.json()
            setData(dataResponse?.data || [])
        } catch (error) {
            console.error("Error fetching featured products:", error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const scrollRight = () => {
        if (scrollElement.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollElement.current
            if (scrollLeft + clientWidth >= scrollWidth - 10) {
                scrollElement.current.scrollLeft = 0
            } else {
                scrollElement.current.scrollLeft += 400
            }
        }
    }

    const scrollLeft = () => {
        if (scrollElement.current) {
            scrollElement.current.scrollLeft -= 400
        }
    }

    useEffect(() => {
        if (!isPaused && data.length > 0) {
            const interval = setInterval(() => {
                scrollRight()
            }, 3000)
            return () => clearInterval(interval)
        }
    }, [isPaused, data])

    const renderStars = (rating) => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className='text-yellow-400' />)
            } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                stars.push(<FaStarHalfAlt key={i} className='text-yellow-400' />)
            } else {
                stars.push(<FaRegStar key={i} className='text-yellow-400' />)
            }
        }
        return stars
    }

    if (!loading && data.length === 0) {
        return null
    }

    return (
        <div 
            className='container mx-auto px-4 my-6 relative'
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
                <button className='hidden md:flex bg-white/80 hover:bg-white shadow-glass rounded-full p-3 absolute left-0 top-1/2 
                    -translate-y-1/2 text-xl z-10 hover:shadow-hover transition-all duration-300 hover:scale-110 backdrop-blur-sm items-center justify-center group' 
                    onClick={scrollLeft}>
                    <FaAngleLeft className='text-gray-800 group-hover:text-gray-600'/>
                </button>

                <button className='hidden md:flex bg-white/80 hover:bg-white shadow-glass rounded-full 
                p-3 absolute right-0 top-1/2 -translate-y-1/2 text-xl z-10 hover:shadow-hover transition-all duration-300 hover:scale-110 backdrop-blur-sm items-center justify-center group' 
                    onClick={scrollRight}>
                    <FaAngleRight className='text-slate-800 group-hover:text-tech-blue'/>
                </button>
                
            <h2 className='text-2xl md:text-3xl font-bold py-4 text-slate-900'>
                {heading}
            </h2>
                
            <div className='relative'>

                {/* Items container */}
                <div className='flex items-center gap-6 overflow-x-scroll scrollbar-hide scroll-smooth px-4' ref={scrollElement}>
                    {loading ? (
                        loadingList.map((_, index) => (
                            <div key={index} className='w-full min-w-[320px] md:min-w-[360px] max-w-[320px] md:max-w-[360px] card-elevated overflow-hidden animate-pulse'>
                                <div className='bg-gradient-to-br from-slate-200 to-slate-100 h-72 p-6'></div>
                                <div className='p-6 space-y-3'>
                                    <div className='h-6 bg-slate-200 rounded'></div>
                                    <div className='h-4 bg-slate-200 rounded w-2/3'></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((item, index) => {
                            const discountPercentage = Math.round(((item.price - item.sellingPrice) / item.price) * 100)
                            const reviewCount = item.reviews?.length || 0
                            const avgRating = reviewCount > 0 
                                ? (item.reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviewCount).toFixed(1)
                                : 0

                            return (
                                <Link 
                                    key={`featured-${item._id}-${index}`} 
                                    to={`/product/${item._id}`} 
                                    className='group w-full min-w-[320px] md:min-w-[360px] max-w-[320px] md:max-w-[360px] card-elevated overflow-hidden hover:shadow-glass-xl'
                                >
                                    <div className='bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 h-64 p-6 flex items-center justify-center relative overflow-hidden'>
                                        <div className='absolute inset-0 bg-gradient-to-t from-white/30 to-transparent'></div>
                                        
                                        {/* Discount Badge */}
                                        {discountPercentage > 0 && (
                                            <div className='absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md z-20 shadow-sm'>
                                                {discountPercentage}% OFF
                                            </div>
                                        )}

                                        {/* Availability Tag */}
                                        <div className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full z-20 shadow-sm ${
                                            item.status === 'In Stock' ? 'bg-green-100 text-green-700' : 
                                            item.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' : 
                                            'bg-red-100 text-red-700'
                                        }`}>
                                            {item.status.toUpperCase()}
                                        </div>

                                        <img 
                                            src={item.productImage[0]} 
                                            alt={item.productName} 
                                            className='relative z-10 object-contain h-full w-full group-hover:scale-110 transition-all duration-500 mix-blend-multiply drop-shadow'
                                        />
                                    </div>
                                    <div className='p-6 space-y-3 bg-white'>
                                        <div className='flex justify-between items-start gap-2'>
                                            <p className='capitalize text-slate-500 text-xs font-semibold tracking-wider'>
                                                {item.category}
                                            </p>
                                            {/* Ratings */}
                                            <div className='flex items-center gap-1'>
                                                <div className='flex text-[10px]'>
                                                    {renderStars(avgRating)}
                                                </div>
                                                <span className='text-[10px] text-slate-400 font-medium'>({reviewCount})</span>
                                            </div>
                                        </div>

                                        <h2 className='font-bold text-slate-900 text-ellipsis line-clamp-2 group-hover:text-tech-blue transition-colors min-h-[3rem] text-base leading-tight'>
                                            {item.productName}
                                        </h2>

                                        <div className='flex flex-col gap-1'>
                                            <div className='flex gap-2 items-center'>
                                                <p className='text-tech-blue font-extrabold text-xl'>
                                                    {displayCurrency(item.sellingPrice, currency)}
                                                </p>
                                                <p className='text-slate-400 line-through text-sm font-medium'>
                                                    {displayCurrency(item.price, currency)}
                                                </p>
                                            </div>
                                        </div>

                                        <button 
                                            className='w-full text-sm bg-gradient-to-r from-tech-blue to-blue-600 hover:from-tech-blue-dark hover:to-blue-700 text-white px-6 py-2.5 rounded-lg transition-all duration-300 hover:shadow-hover font-bold transform hover:-translate-y-0.5 active:scale-95 mt-2' 
                                            onClick={(e) => handleAddToCart(e, item._id)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </Link>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default FeaturedProductSection
