import React, { useContext, useState } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'
import { ShoppingCart, Heart } from 'lucide-react'
import { FaStar, FaStarHalf } from "react-icons/fa";

const VerticalCard = ({loading,data = []}) => {
    const loadingList = new Array(8).fill(null)
    const { fetchUserAddToCart, currency } = useContext(Context)
    const [wishlistStates, setWishlistStates] = useState({})

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    const toggleWishlist = (e, id) => {
        e.preventDefault()
        e.stopPropagation()
        setWishlistStates(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] justify-center gap-6 md:gap-8 transition-all'>
    {
         loading ? (
             loadingList.map((product,index)=>{
                 return(
                     <div key={index} className='w-full bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden'>
                         <div className='bg-slate-100 aspect-square animate-pulse'>
                         </div>
                         <div className='p-5 space-y-3'>
                             <div className='h-4 bg-slate-100 rounded-full w-1/3 animate-pulse'></div>
                             <div className='h-6 bg-slate-100 rounded-lg w-full animate-pulse'></div>
                             <div className='flex gap-3'>
                                 <div className='h-6 bg-slate-100 rounded-full w-20 animate-pulse'></div>
                                 <div className='h-6 bg-slate-100 rounded-full w-16 animate-pulse'></div>
                             </div>
                             <div className='h-10 bg-slate-100 rounded-xl w-full animate-pulse mt-2'></div>
                         </div>
                     </div>
                 )
             })
         ) : (
             data.map((product,index)=>{
                 const discountPercent = product?.price && product?.sellingPrice
                    ? Math.round(((product.price - product.sellingPrice) / product.price) * 100)
                    : 0

                 const avgRating = product?.reviews?.length > 0 
                    ? product.reviews.reduce((acc, curr) => acc + curr.rating, 0) / product.reviews.length 
                    : 0;

                 return(
                     <Link 
                        key={product?._id} 
                        to={"/product/"+product?._id} 
                        className='group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-hover transition-all duration-300 overflow-hidden flex flex-col' 
                        onClick={scrollTop}
                     >
                         {/* Image Section */}
                         <div className='relative aspect-square bg-slate-50 flex justify-center items-center p-6 overflow-hidden'>
                             <img 
                                src={product?.productImage[0]} 
                                className='object-contain h-full w-full group-hover:scale-110 transition-transform duration-500 mix-blend-multiply'
                                alt={product?.productName}
                             />
                             
                             {/* Badges */}
                             <div className='absolute top-3 left-3 flex flex-col gap-2'>
                                {discountPercent > 0 && (
                                    <span className='bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm'>
                                        -{discountPercent}%
                                    </span>
                                )}
                                <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm ${
                                    product?.status === 'In Stock' ? 'bg-green-100 text-green-600' :
                                    product?.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-600' :
                                    'bg-red-100 text-red-600'
                                }`}>
                                    {product?.status || 'In Stock'}
                                </div>
                             </div>

                             {/* Wishlist Button */}
                             <button 
                                onClick={(e) => toggleWishlist(e, product?._id)}
                                className={`absolute top-3 right-3 p-2 rounded-full shadow-sm transition-all duration-300 ${
                                    wishlistStates[product?._id] 
                                    ? 'bg-red-50 text-red-500' 
                                    : 'bg-white text-slate-400 hover:text-red-500'
                                }`}
                             >
                                <Heart size={18} fill={wishlistStates[product?._id] ? "currentColor" : "none"} />
                             </button>
                         </div>

                         {/* Content Section */}
                         <div className='p-5 flex flex-col flex-1'>
                             <div className='flex items-center justify-between mb-1'>
                                <span className='text-[10px] font-bold text-tech-blue uppercase tracking-widest'>
                                    {product?.category}
                                </span>
                                {/* Rating Display */}
                                <div className='flex items-center gap-1'>
                                    <div className='flex items-center text-yellow-400 text-[10px]'>
                                        {[...Array(5)].map((_, i) => {
                                            if (i < Math.floor(avgRating)) return <FaStar key={i} />
                                            if (i < avgRating) return <FaStarHalf key={i} />
                                            return <FaStar key={i} className='text-slate-200' />
                                        })}
                                    </div>
                                    <span className='text-[10px] text-slate-400 font-medium'>({product?.reviews?.length || 0})</span>
                                </div>
                             </div>

                             <h2 className='font-bold text-slate-900 text-base md:text-lg line-clamp-1 group-hover:text-tech-blue transition-colors mb-2'>
                                {product?.productName}
                             </h2>
                             
                             <div className='mt-auto'>
                                 <div className='flex items-baseline gap-2 mb-4'>
                                     <span className='text-xl font-bold text-slate-900'>
                                        { displayCurrency(product?.sellingPrice, currency) }
                                     </span>
                                     {product?.price > product?.sellingPrice && (
                                         <span className='text-sm text-slate-400 line-through'>
                                            { displayCurrency(product?.price, currency) }
                                         </span>
                                     )}
                                 </div>
                                 
                                 <button 
                                    className='w-full bg-tech-blue hover:bg-tech-blue-dark text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100 active:scale-[0.98]' 
                                    onClick={(e)=>handleAddToCart(e,product?._id)}
                                 >
                                    <ShoppingCart size={18} />
                                    <span className='text-sm'>Add to Cart</span>
                                 </button>
                             </div>
                         </div>
                     </Link>
                 )
             })
         )
    }
    </div>
  )
}

export default VerticalCard