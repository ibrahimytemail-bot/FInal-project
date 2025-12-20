import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar, FaStarHalf, FaHeart, FaRegHeart } from "react-icons/fa";
import { ShoppingCart, Truck, Shield, Package, Check, ArrowLeft } from 'lucide-react'
import displayCurrency from '../helpers/displayCurrency'
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import useTitle from '../hooks/useTitle'

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })
  
  useTitle(data?.productName || 'Product Details')
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  })
  const [zoomImage, setZoomImage] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewComment, setReviewComment] = useState("")
  const [reviewSubmitting, setReviewSubmitting] = useState(false)

  const { fetchUserAddToCart, currency } = useContext(Context)
  const navigate = useNavigate()

  const handleSubmitReview = async () => {
    if (reviewRating === 0) {
      alert("Please select a rating")
      return
    }
    if (!reviewComment.trim()) {
      alert("Please write a comment")
      return
    }

    setReviewSubmitting(true)
    try {
      const response = await fetch(SummaryApi.addReview.url, {
        method: SummaryApi.addReview.method,
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          productId: data._id,
          rating: reviewRating,
          comment: reviewComment
        })
      })
      const dataResponse = await response.json()
      if (dataResponse.success) {
        alert("Review submitted successfully")
        setReviewRating(0)
        setReviewComment("")
        fetchProductDetails() // Refresh to show new review
      } else {
        alert(dataResponse.message)
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      alert("Failed to submit review")
    } finally {
      setReviewSubmitting(false)
    }
  }

  const fetchProductDetails = async () => {
    setLoading(true)
    try {
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          productId: params?.id
        })
      })
      const dataReponse = await response.json()
      setData(dataReponse?.data)
      setActiveImage(dataReponse?.data?.productImage[0])
    } catch (error) {
      console.error("Error fetching product details:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleMouseEnterProduct = (imageURL, index) => {
    setActiveImage(imageURL)
    setActiveImageIndex(index)
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
  }, [])

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
    navigate("/checkout")
  }

  const discountPercent = data.price && data.sellingPrice
    ? Math.round(((data.price - data.sellingPrice) / data.price) * 100)
    : 0

  return (
    <div className='min-h-screen bg-slate-100'>
      <div className='container mx-auto px-4 py-6 md:py-8'>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 text-slate-600 hover:text-tech-blue font-semibold mb-6 transition-colors group'
        >
          <ArrowLeft size={20} className='group-hover:-translate-x-1 transition-transform' />
          Back to Results
        </button>

        {/* while loading show this gray stucture */}
        {loading ? (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
            {/* Loading Skeleton */}
            <div className='flex flex-col gap-4'>
              <div className='w-full aspect-square bg-slate-200 rounded-xl animate-pulse'></div>
              <div className='flex gap-3 overflow-x-auto pb-2'>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className='w-20 h-20 bg-slate-200 rounded-lg flex-shrink-0 animate-pulse'></div>
                ))}
              </div>
            </div>
            <div className='flex flex-col gap-6'>
              <div className='h-8 bg-slate-200 rounded-full w-1/3 animate-pulse'></div>
              <div className='h-12 bg-slate-200 rounded-lg w-full animate-pulse'></div>
              <div className='h-6 bg-slate-200 rounded-lg w-1/2 animate-pulse'></div>
              <div className='h-24 bg-slate-200 rounded-xl w-full animate-pulse'></div>
              <div className='flex gap-3'>
                <div className='h-12 bg-slate-200 rounded-lg flex-1 animate-pulse'></div>
                <div className='h-12 bg-slate-200 rounded-lg flex-1 animate-pulse'></div>
              </div>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12'>
            {/* Image Section - Spans 5 columns */}
            <div className='lg:col-span-5 flex flex-col-reverse lg:flex-row gap-4'>
              {/* Thumbnail Images (Left Side on Desktop, Bottom on Mobile) */}
              <div className='flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:h-[500px] scrollbar-hide py-2 lg:py-0 px-1'>
                {data?.productImage?.map((imgURL, index) => (
                  <div
                    key={`thumb-${index}`}
                    onMouseEnter={() => handleMouseEnterProduct(imgURL, index)}
                    onClick={() => handleMouseEnterProduct(imgURL, index)}
                    className={`w-16 h-16 lg:w-20 lg:h-20 rounded-lg flex-shrink-0 cursor-pointer border-2 bg-white p-1 transition-all ${
                      activeImageIndex === index
                        ? 'border-tech-blue ring-2 ring-tech-blue/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={imgURL}
                      alt={`Thumbnail ${index + 1}`}
                      className='w-full h-full object-contain mix-blend-multiply'
                    />
                  </div>
                ))}
              </div>

              {/* Main Image with Zoom */}
              <div className='flex-1 rounded-2xl overflow-visible relative z-20'>
                <div className='relative w-full aspect-square flex items-center justify-center group'>
                  <img
                    src={activeImage}
                    alt={data?.productName}
                    className='w-full h-full object-contain mix-blend-multiply cursor-crosshair'
                    onMouseMove={handleZoomImage}
                    onMouseLeave={handleLeaveImageZoom}
                  />

                  {/* Discount Badge */}
                  {discountPercent > 0 && (
                    <div className='absolute top-4 left-4 bg-red-600 text-white rounded-full px-3 py-1 font-bold text-sm shadow-md pointer-events-none'>
                      -{discountPercent}%
                    </div>
                  )}

                  {/* Zoom Preview Overlay - Amazon Style */}
                  {zoomImage && (
                    <div className='hidden lg:block absolute left-[102%] top-0 w-[700px] h-[500px] bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden z-[100]'>
                      <div
                        className='w-full h-full mix-blend-multiply'
                        style={{
                          backgroundImage: `url(${activeImage})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                          backgroundSize: '250%' // 2.5x Zoom
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info Section - Spans 7 columns */}
            <div className='lg:col-span-7 flex flex-col gap-6'>
              <div className='bg-white rounded-2xl border border-slate-200 shadow-sm px-6 mt-2'>
                {/* Brand & Wishlist */}
                <div className='flex items-center justify-between mb-2.5'>
                  <span className='text-tech-blue font-bold tracking-wide uppercase text-sm bg-blue-50 px-3 py-1 rounded-full'>
                    {data?.brandName}
                  </span>
                  <button
                    onClick={() => setWishlist(!wishlist)}
                    className={`p-2 mt-2 rounded-full transition-all ${
                      wishlist 
                        ? 'bg-red-50 text-red-500' 
                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                    }`}
                  >
                    {wishlist ? <FaHeart size={22} /> : <FaRegHeart size={22} />}
                  </button>
                </div>

                {/* Title & Rating */}
                <h1 className='text-2xl md:text-3xl font-bold text-slate-900 mb-3 leading-tight'>
                  {data?.productName}
                </h1>
                
                <div className='flex items-center gap-4 mb-6'>
                  <div className='flex items-center gap-1 text-yellow-400'>
                    {[...Array(5)].map((_, i) => {
                      const avgRating = data?.reviews?.length > 0 
                        ? data.reviews.reduce((acc, curr) => acc + curr.rating, 0) / data.reviews.length 
                        : 0;
                      
                      if (i < Math.floor(avgRating)) {
                        return <FaStar key={i} size={18} />
                      } else if (i < avgRating) {
                        return <FaStarHalf key={i} size={18} />
                      } else {
                        return <FaStar key={i} size={18} className='text-slate-200' />
                      }
                    })}
                  </div>
                  <span className='text-slate-500 text-sm font-medium'>{data?.reviews?.length || 0} Reviews</span>
                  <span className='text-slate-300'>|</span>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    data?.status === 'In Stock' ? 'bg-green-100 text-green-600' :
                    data?.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {data?.status || 'In Stock'}
                  </div>
                  <span className='text-slate-300'>|</span>
                  <span className='text-green-600 text-sm font-medium flex items-center gap-1'>
                    <Check size={16} /> Verified
                  </span>
                </div>

                {/* Price Block */}
                <div className='bg-slate-50 rounded-xl p-6 mb-6 border border-slate-100'>
                  <div className='flex items-baseline gap-3 mb-1'>
                    <span className='text-4xl font-bold text-slate-900'>
                      {displayCurrency(data?.sellingPrice, currency)}
                    </span>
                    {data?.price > data?.sellingPrice && (
                      <span className='text-xl text-slate-400 line-through font-medium'>
                        {displayCurrency(data?.price, currency)}
                      </span>
                    )}
                  </div>
                  <p className='text-sm text-slate-500'>Inclusive of all taxes</p>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row gap-4 mb-8'>
                  <button
                    onClick={(e) => handleBuyProduct(e, data?._id)}
                    className='flex-1 bg-tech-blue hover:bg-tech-blue-dark text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98] flex items-center justify-center gap-2'
                  >
                    <Package size={20} />
                    Buy Now
                  </button>
                  <button
                    onClick={(e) => handleAddToCart(e, data?._id)}
                    className='flex-1 border-2 border-slate-200 hover:border-tech-blue text-slate-700 hover:text-tech-blue font-bold py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 bg-white'
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 pt-5 mb-4 border-t border-slate-100'>
                  <div className='flex flex-col items-center gap-2 text-center'>
                    <div className='w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-tech-blue'>
                      <Truck size={20} />
                    </div>
                    <span className='text-xs font-semibold text-slate-600'>Free Delivery</span>
                  </div>
                  <div className='flex flex-col items-center gap-2 text-center'>
                    <div className='w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-tech-blue'>
                      <Shield size={20} />
                    </div>
                    <span className='text-xs font-semibold text-slate-600'>1 Year Warranty</span>
                  </div>
                  <div className='flex flex-col items-center gap-2 text-center'>
                    <div className='w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-tech-blue'>
                      <Package size={20} />
                    </div>
                    <span className='text-xs font-semibold text-slate-600'>7 Days Return</span>
                  </div>
                  <div className='flex flex-col items-center gap-2 text-center'>
                    <div className='w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-tech-blue'>
                      <Check size={20} />
                    </div>
                    <span className='text-xs font-semibold text-slate-600'>Secure Payment</span>
                  </div>
                </div>
              </div>

              {/* Description & Details */}
              <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8'>
                <h2 className='text-xl font-bold text-slate-900 mb-4'>Product Description:</h2>
                <p className='text-slate-600 leading-relaxed whitespace-pre-line'>
                  {data?.description}
                </p>
                
                <div className='mt-8 pt-8 border-t border-slate-100'>
                  <h2 className='text-xl font-bold text-slate-900 mb-4'>Specifications:</h2>
                  <div className='grid grid-cols-1 md:grid-cols-1 gap-4'>
                    <div className='flex justify-between py-2 border-b border-slate-50'>
                      <span className='text-slate-500'>Brand:</span>
                      <span className='font-medium text-slate-900'>{data?.brandName}</span>
                    </div>
                    <div className='flex justify-between py-2 border-b border-slate-50'>
                      <span className='text-slate-500'>Category:</span>
                      <span className='font-medium text-slate-900 capitalize'>{data?.category}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mt-8'>
                <h2 className='text-2xl font-bold text-slate-900 mb-6'>Customer Reviews</h2>
                
                {/* Add Review Form */}
                <div className='mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100'>
                  <h3 className='text-lg font-semibold mb-4'>Write a Review</h3>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-2'>
                      <span className='text-slate-600'>Rating:</span>
                      <div className='flex gap-1'>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type='button'
                            onClick={() => setReviewRating(star)}
                            className={`text-2xl transition-colors ${star <= reviewRating ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-200'}`}
                          >
                            <FaStar />
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      className='w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-tech-blue focus:ring-1 focus:ring-tech-blue'
                      rows='4'
                      placeholder='Share your thoughts about this product...'
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                    ></textarea>
                    <button
                      onClick={handleSubmitReview}
                      disabled={reviewSubmitting}
                      className='self-end bg-tech-blue hover:bg-tech-blue-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </div>
                </div>

                {/* Reviews List */}
                <div className='space-y-6'>
                  {data?.reviews?.length > 0 ? (
                    data.reviews.map((review, index) => (
                      <div key={index} className='border-b border-slate-100 pb-6 last:border-0'>
                        <div className='flex items-center justify-between mb-2'>
                          <div className='flex items-center gap-2'>
                            <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-tech-blue font-bold'>
                              {review.userName?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div>
                              <p className='font-semibold text-slate-900'>{review.userName || 'Anonymous'}</p>
                              <div className='flex text-yellow-400 text-sm'>
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-slate-200'} />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className='text-sm text-slate-500'>
                            {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <p className='text-slate-700 mt-2'>{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className='text-slate-500 text-center py-8'>No reviews yet. Be the first to review this product!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Products */}
        {data.category && !loading && (
            <CategroyWiseProductDisplay category={data?.category} heading="Similar Products" />
        )}
      </div>
    </div>
  )
}

export default ProductDetails
