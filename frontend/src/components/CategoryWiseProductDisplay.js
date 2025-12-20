import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight, FaStar } from 'react-icons/fa6'
import { ShoppingCart, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

const CategroyWiseProductDisplay = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [scrollPosition, setScrollPosition] = useState(0)
    const scrollContainerRef = React.useRef(null)
    const loadingList = new Array(6).fill(null)

    const { fetchUserAddToCart, currency } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        e.preventDefault()
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const fetchData = async () => {
        setLoading(true)
        try {
            const categoryProduct = await fetchCategoryWiseProduct(category)
            setData(categoryProduct?.data || [])
        } catch (error) {
            console.error("Error fetching category products:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [category])

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 350
            const currentScroll = scrollContainerRef.current.scrollLeft
            const targetScroll = direction === 'left'
                ? currentScroll - scrollAmount
                : currentScroll + scrollAmount

            scrollContainerRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            })

            setScrollPosition(targetScroll)
        }
    }

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            setScrollPosition(scrollContainerRef.current.scrollLeft)
        }
    }

    return (
        <div className='w-full'>
            {/* Header Section */}
            <div className='mb-6 flex items-center justify-between'>
                <div>
                    <h2 className='text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3'>
                        <span className='w-1.5 h-10 bg-gradient-to-b from-tech-blue to-tech-blue-dark rounded-full'></span>
                        {heading}
                    </h2>
                    <p className='text-slate-600 mt-1 text-sm'>Handpicked items just for you</p>
                </div>

                {/* View All Link */}
                {data.length > 0 && (
                    <Link
                        to={`/product-category?category=${category}`}
                        className='hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-tech-blue hover:bg-blue-50 font-semibold transition-colors'
                    >
                        View All
                        <ArrowRight size={18} />
                    </Link>
                )}
            </div>

            {/* Products Grid with Carousel */}
            <div className='relative group'>
                {/* Products Container */}
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className='flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory'
                >
                    {loading ? (
                        // Loading State
                        loadingList.map((_, index) => (
                            <div
                                key={`loading-${index}`}
                                className='flex-shrink-0 w-full sm:w-80 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-pulse'
                            >
                                <div className='bg-slate-200 h-56 flex items-center justify-center'></div>
                                <div className='p-4 space-y-3'>
                                    <div className='h-4 bg-slate-200 rounded w-3/4'></div>
                                    <div className='h-3 bg-slate-200 rounded w-1/2'></div>
                                    <div className='flex gap-2'>
                                        <div className='h-4 bg-slate-200 rounded flex-1'></div>
                                        <div className='h-4 bg-slate-200 rounded flex-1'></div>
                                    </div>
                                    <div className='h-10 bg-slate-200 rounded-lg'></div>
                                </div>
                            </div>
                        ))
                    ) : data.length > 0 ? (
                        // Products List
                        data.map((product) => (
                            <Link
                                key={product?._id}
                                to={"/product/" + product?._id}
                                onClick={scrollTop}
                                className='flex-shrink-0 w-full sm:w-80 snap-center'
                            >
                                <div className='bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col hover:-translate-y-1'>
                                    {/* Image Container */}
                                    <div className='relative bg-gradient-to-br from-slate-100 to-slate-200 h-56 flex items-center justify-center overflow-hidden group/image'>
                                        <img
                                            src={product?.productImage[0]}
                                            alt={product?.productName}
                                            className='h-full w-full object-contain mix-blend-multiply group-hover/image:scale-110 transition-transform duration-300'
                                        />

                                        {/* Discount Badge */}
                                        {product?.price && product?.sellingPrice && (
                                            <div className='absolute top-3 left-3 bg-red-600 text-white rounded-lg px-3 py-1.5 font-bold text-sm'>
                                                -{Math.round(((product?.price - product?.sellingPrice) / product?.price) * 100)}%
                                            </div>
                                        )}

                                        {/* Quick Add Button (On Hover) */}
                                        <button
                                            onClick={(e) => handleAddToCart(e, product?._id)}
                                            className='absolute bottom-3 right-3 bg-tech-blue hover:bg-tech-blue-dark text-white p-3 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 shadow-lg'
                                            title='Quick add to cart'
                                        >
                                            <ShoppingCart size={20} />
                                        </button>
                                    </div>

                                    {/* Content Section */}
                                    <div className='p-4 flex-1 flex flex-col justify-between'>
                                        {/* Product Info */}
                                        <div className='mb-3'>
                                            <h3 className='font-semibold text-base text-slate-900 line-clamp-2 mb-1.5 group-hover:text-tech-blue transition-colors'>
                                                {product?.productName}
                                            </h3>
                                            <p className='capitalize text-xs text-slate-500 mb-2'>
                                                {product?.category}
                                            </p>

                                            {/* Rating */}
                                            <div className='flex items-center gap-1 mb-3'>
                                                <FaStar className='text-yellow-400' size={14} />
                                                <span className='text-xs font-semibold text-slate-700'>4.5</span>
                                                <span className='text-xs text-slate-500'>(120)</span>
                                            </div>
                                        </div>

                                        {/* Price Section */}
                                        <div className='mb-3 pt-3 border-t border-slate-200'>
                                            <div className='flex items-baseline gap-2 mb-1'>
                                                <span className='text-xl font-bold text-red-600'>
                                                    {displayCurrency(product?.sellingPrice, currency)}
                                                </span>
                                                {product?.price > product?.sellingPrice && (
                                                    <span className='text-sm text-slate-400 line-through'>
                                                        {displayCurrency(product?.price, currency)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Add to Cart Button */}
                                        <button
                                            onClick={(e) => handleAddToCart(e, product?._id)}
                                            className='w-full bg-gradient-to-r from-tech-blue to-tech-blue-dark hover:shadow-md text-white font-semibold py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2'
                                        >
                                            <ShoppingCart size={16} />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        // Empty State
                        <div className='w-full py-12 text-center'>
                            <p className='text-slate-500 text-lg'>No products available in this category</p>
                        </div>
                    )}
                </div>

                {/* Navigation Arrows - Desktop Only */}
                {data.length > 0 && !loading && (
                    <>
                        {scrollPosition > 0 && (
                            <button
                                onClick={() => scroll('left')}
                                className='hidden group-hover:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:bg-slate-50 text-tech-blue hover:text-tech-blue-dark transition-all duration-300'
                                aria-label='Scroll left'
                            >
                                <FaAngleLeft size={20} />
                            </button>
                        )}

                        {scrollPosition < 300 && (
                            <button
                                onClick={() => scroll('right')}
                                className='hidden group-hover:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:bg-slate-50 text-tech-blue hover:text-tech-blue-dark transition-all duration-300'
                                aria-label='Scroll right'
                            >
                                <FaAngleRight size={20} />
                            </button>
                        )}
                    </>
                )}
            </div>

            {/* Mobile View All Button */}
            {data.length > 0 && (
                <div className='md:hidden mt-6 text-center'>
                    <Link
                        to={`/product-category?category=${category}`}
                        className='inline-flex items-center gap-2 px-6 py-2.5 bg-tech-blue hover:bg-tech-blue-dark text-white font-semibold rounded-lg transition-colors'
                    >
                        View All Products
                        <ArrowRight size={18} />
                    </Link>
                </div>
            )}
        </div>
    )
}

export default CategroyWiseProductDisplay
