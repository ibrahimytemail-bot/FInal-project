import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import useTitle from '../hooks/useTitle'
import CartItem from '../components/CartItem'
import OrderSummary from '../components/OrderSummary'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

const Cart = () => {
    useTitle('Shopping Cart')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const navigate = useNavigate()

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
            })

            const responseData = await response.json()

            if (responseData.success) {
                setData(responseData.data)
            }
        } catch (error) {
            console.error("Error fetching cart:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const increaseQty = async (id, qty) => {
        try {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty + 1
                })
            })

            const responseData = await response.json()

            if (responseData.success) {
                fetchData()
            }
        } catch (error) {
            console.error("Error increasing quantity:", error)
        }
    }

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            try {
                const response = await fetch(SummaryApi.updateCartProduct.url, {
                    method: SummaryApi.updateCartProduct.method,
                    credentials: 'include',
                    headers: {
                        "content-type": 'application/json'
                    },
                    body: JSON.stringify({
                        _id: id,
                        quantity: qty - 1
                    })
                })

                const responseData = await response.json()

                if (responseData.success) {
                    fetchData()
                }
            } catch (error) {
                console.error("Error decreasing quantity:", error)
            }
        }
    }

    const deleteCartProduct = async (id) => {
        try {
            const response = await fetch(SummaryApi.deleteCartProduct.url, {
                method: SummaryApi.deleteCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({ _id: id })
            })

            const responseData = await response.json()

            if (responseData.success) {
                fetchData()
                context.fetchUserAddToCart()
            }
        } catch (error) {
            console.error("Error deleting cart item:", error)
        }
    }

    const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0)
    const subtotal = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0)
    const shipping = subtotal > 999 ? 0 : 99
    const tax = Math.round(subtotal * 0.05)

    return (
        <div className='container mx-auto px-4 py-6'>
            {/* Header */}
            <div className='mb-8'>
                <div className='flex items-center gap-3'>
                    <ShoppingCart size={32} className='text-cyan-600' />
                    <h1 className='text-3xl font-bold text-slate-900'>Shopping Cart</h1>
                </div>
                {data.length > 0 && (
                    <p className='text-slate-600 mt-2'>You have {totalQty} item{totalQty !== 1 ? 's' : ''} in your cart</p>
                )}
            </div>

            {/* Empty State */}
            {data.length === 0 && !loading && (
                <div className='bg-white rounded-lg border border-slate-200 shadow-sm p-12 text-center'>
                    <ShoppingCart size={64} className='mx-auto text-slate-300 mb-4' />
                    <h2 className='text-2xl font-bold text-slate-900 mb-2'>Your cart is empty</h2>
                    <p className='text-slate-600 mb-6'>Add some items to get started!</p>
                    <button
                        onClick={() => navigate('/')}
                        className='bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors'
                    >
                        Continue Shopping
                    </button>
                </div>
            )}

            {/* Cart Content */}
            {data.length > 0 && (
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {/* Cart Items */}
                    <div className='lg:col-span-2 space-y-4'>
                        {loading ? (
                            Array(3).fill(null).map((_, index) => (
                                <div
                                    key={`loading-${index}`}
                                    className='w-full bg-slate-200 h-40 rounded-lg animate-pulse'
                                />
                            ))
                        ) : (
                            data.map((product) => (
                                <CartItem
                                    key={product?._id}
                                    product={product}
                                    onIncrease={increaseQty}
                                    onDecrease={decreaseQty}
                                    onDelete={deleteCartProduct}
                                />
                            ))
                        )}
                    </div>

                    {/* Order Summary & Checkout */}
                    <div className='lg:col-span-1 mb-12'>
                        <OrderSummary
                            totalQty={totalQty}
                            subtotal={subtotal}
                            shipping={shipping}
                            tax={tax}
                            loading={loading}
                        >
                            <button
                                onClick={() => navigate('/checkout')}
                                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors'
                            >
                                Proceed to Checkout
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className='w-full mt-2 border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold py-2 rounded-lg transition-colors'
                            >
                                Continue Shopping
                            </button>
                        </OrderSummary>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Cart
