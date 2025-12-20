import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { FaStar, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

const AllReviews = () => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchAllReviews = async () => {
        setLoading(true)
        try {
            const response = await fetch(SummaryApi.allReviews.url, {
                method: SummaryApi.allReviews.method,
                credentials: 'include'
            })
            const dataResponse = await response.json()

            if (dataResponse.success) {
                setReviews(dataResponse.data)
            } else {
                toast.error(dataResponse.message)
            }
        } catch (error) {
            console.error("Error fetching reviews:", error)
            toast.error("Failed to fetch reviews")
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteReview = async (productId, reviewId) => {
        if(!window.confirm("Are you sure you want to delete this review?")) return

        try {
            const response = await fetch(SummaryApi.deleteReview.url, {
                method: SummaryApi.deleteReview.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    productId,
                    reviewId
                })
            })
            const dataResponse = await response.json()

            if (dataResponse.success) {
                toast.success("Review deleted successfully")
                fetchAllReviews()
            } else {
                toast.error(dataResponse.message)
            }
        } catch (error) {
            console.error("Error deleting review:", error)
            toast.error("Failed to delete review")
        }
    }

    useEffect(() => {
        fetchAllReviews()
    }, [])

    return (
        <div className='bg-white p-4 rounded-lg shadow-md h-full overflow-y-scroll scrollbar-none'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold text-slate-800'>All Reviews</h2>
            </div>

            {loading ? (
                <div className='flex justify-center items-center h-64'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-tech-blue'></div>
                </div>
            ) : reviews.length === 0 ? (
                <div className='text-center text-slate-500 py-12'>
                    No reviews found.
                </div>
            ) : (
                <div className='overflow-x-auto'>
                    <table className='w-full text-left border-collapse'>
                        <thead>
                            <tr className='bg-slate-100 text-slate-600 uppercase text-sm leading-normal'>
                                <th className='py-3 px-4 rounded-l-lg'>Product</th>
                                <th className='py-3 px-4'>User</th>
                                <th className='py-3 px-4'>Rating</th>
                                <th className='py-3 px-4 w-1/3'>Comment</th>
                                <th className='py-3 px-4'>Date</th>
                                <th className='py-3 px-4 rounded-r-lg text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-slate-600 text-sm font-light'>
                            {reviews.map((review, index) => (
                                <tr key={index} className='border-b border-slate-100 hover:bg-slate-50 transition-colors'>
                                    <td className='py-3 px-4'>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-12 h-12 rounded-lg overflow-hidden border border-slate-200'>
                                                <img src={review.productImage} alt={review.productName} className='w-full h-full object-contain mix-blend-multiply' />
                                            </div>
                                            <div>
                                                <p className='font-semibold text-slate-900 line-clamp-1'>{review.productName}</p>
                                                <p className='text-xs text-slate-500 capitalize'>{review.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-3 px-4'>
                                        <div className='font-medium text-slate-900'>{review.userName}</div>
                                        <div className='text-xs text-slate-500'>ID: {review.userId}</div>
                                    </td>
                                    <td className='py-3 px-4'>
                                        <div className='flex text-yellow-400'>
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-slate-200'} size={14} />
                                            ))}
                                        </div>
                                    </td>
                                    <td className='py-3 px-4'>
                                        <p className='line-clamp-2' title={review.comment}>{review.comment}</p>
                                    </td>
                                    <td className='py-3 px-4'>
                                        {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        <div className='text-xs text-slate-400'>
                                            {new Date(review.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </td>
                                    <td className='py-3 px-4 text-center'>
                                        <button
                                            onClick={() => handleDeleteReview(review.productId, review._id)}
                                            className='bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition-colors'
                                            title='Delete Review'
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AllReviews
