import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Package, Truck, MapPin, Calendar } from 'lucide-react'
import displayCurrency from '../helpers/displayCurrency'
import OrderSummary from '../components/OrderSummary'
import Context from '../context'

const OrderPlaced = () => {
    const navigate = useNavigate()
    const [orderData, setOrderData] = useState(null)
    const [loading, setLoading] = useState(true)
    const { currency } = useContext(Context)

    useEffect(() => {
        // Retrieve order data from localStorage
        const lastOrder = localStorage.getItem('lastOrder')
        if (lastOrder) {
            setOrderData(JSON.parse(lastOrder))
        }
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <div className='container mx-auto px-4 py-6'>
                <div className='text-center'>
                    <div className='inline-block w-16 h-16 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin'></div>
                </div>
            </div>
        )
    }

    if (!orderData) {
        return (
            <div className='container mx-auto px-4 py-6'>
                <div className='bg-white rounded-lg border border-slate-200 shadow-sm p-12 text-center'>
                    <p className='text-slate-600 mb-4'>No order information found</p>
                    <button
                        onClick={() => navigate('/')}
                        className='text-blue-600 hover:text-blue-700 font-semibold'
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='container mx-auto px-4 py-6'>
            {/* Success Section */}
            <div className='text-center mb-8'>
                <div className='flex justify-center mb-4'>
                    <div className='relative'>
                        <CheckCircle size={80} className='text-green-500' />
                        <Package size={40} className='absolute bottom-0 right-0 text-blue-600 bg-white rounded-full p-1' />
                    </div>
                </div>
                <h1 className='text-4xl font-bold text-slate-900 mb-2'>Order Confirmed!</h1>
                <p className='text-slate-600 text-lg mb-4'>Thank you for your purchase</p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Order Details */}
                <div className='lg:col-span-2 space-y-6'>
                    {/* Order Number & Date */}
                    <div className='bg-white rounded-lg border border-slate-200 shadow-sm p-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div>
                                <p className='text-slate-600 text-sm font-semibold mb-1'>Order Number</p>
                                <p className='text-2xl font-bold text-slate-900'>{orderData.orderId}</p>
                            </div>
                            <div>
                                <p className='text-slate-600 text-sm font-semibold mb-1'>Order Date</p>
                                <p className='text-2xl font-bold text-slate-900'>{orderData.orderDate}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    {orderData.shippingAddress && (
                        <div className='bg-white rounded-lg border border-slate-200 shadow-sm p-6'>
                            <div className='flex items-center gap-3 mb-4'>
                                <MapPin size={24} className='text-blue-600' />
                                <h2 className='text-xl font-bold text-slate-900'>Shipping Address</h2>
                            </div>
                            <div className='bg-slate-50 rounded-lg p-4'>
                                <p className='font-semibold text-slate-900'>{orderData.shippingAddress.fullName}</p>
                                <p className='text-slate-700'>{orderData.shippingAddress.addressLine1}</p>
                                {orderData.shippingAddress.addressLine2 && (
                                    <p className='text-slate-700'>{orderData.shippingAddress.addressLine2}</p>
                                )}
                                <p className='text-slate-700'>
                                    {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.pinCode}
                                </p>
                                <p className='text-slate-700'>{orderData.shippingAddress.country}</p>
                                <div className='mt-3 pt-3 border-t border-slate-200'>
                                    <p className='text-sm text-slate-600'>
                                        <strong>Email:</strong> {orderData.shippingAddress.email}
                                    </p>
                                    <p className='text-sm text-slate-600'>
                                        <strong>Phone:</strong> {orderData.shippingAddress.phoneNumber}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Estimated Delivery */}
                    <div className='bg-white rounded-lg border border-slate-200 shadow-sm p-6'>
                        <div className='flex items-center gap-3 mb-4'>
                            <Truck size={24} className='text-green-600' />
                            <h2 className='text-xl font-bold text-slate-900'>Estimated Delivery</h2>
                        </div>
                        <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                            <p className='text-lg font-bold text-green-700'>{orderData.estimatedDelivery || "5-7 Business Days"}</p>
                            <p className='text-sm text-green-600 mt-2'>Expected delivery within 5-7 business days</p>
                        </div>
                    </div>

                    {/* Order Items */}
                    {orderData.items && (
                        <div className='bg-white rounded-lg border border-slate-200 shadow-sm p-6'>
                            <h2 className='text-xl font-bold text-slate-900 mb-4'>Order Items</h2>
                            <div className='space-y-4'>
                                {orderData.items.map((item, index) => (
                                    <div key={index} className='flex gap-4 pb-4 border-b border-slate-200 last:border-0'>
                                        <div className='w-20 h-20 bg-slate-100 rounded-lg flex-shrink-0 overflow-hidden'>
                                            <img
                                                src={item?.productId?.productImage[0]}
                                                alt={item?.productId?.productName}
                                                className='w-full h-full object-scale-down mix-blend-multiply'
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <p className='font-semibold text-slate-900'>{item?.productId?.productName}</p>
                                            <p className='text-sm text-slate-500'>{item?.productId?.category}</p>
                                            <p className='text-sm text-slate-600 mt-1'>Quantity: {item.quantity}</p>
                                        </div>
                                        <div className='text-right'>
                                            <p className='font-semibold text-slate-900'>
                                                {displayCurrency(item?.productId?.sellingPrice * item.quantity, currency)}
                                            </p>
                                            <p className='text-sm text-slate-500'>
                                                {displayCurrency(item?.productId?.sellingPrice, currency)} each
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Payment Method */}
                    {orderData.paymentMethod && (
                        <div className='bg-white rounded-lg border border-slate-200 shadow-sm p-6'>
                            <h2 className='text-lg font-bold text-slate-900 mb-3'>Payment Method</h2>
                            <div className='bg-slate-50 rounded-lg p-4'>
                                <p className='font-semibold text-slate-900 capitalize'>
                                    {orderData.paymentMethod === 'card' && 'Credit/Debit Card'}
                                    {orderData.paymentMethod === 'upi' && 'UPI'}
                                    {orderData.paymentMethod === 'netbanking' && 'Net Banking'}
                                    {orderData.paymentMethod === 'wallet' && 'Digital Wallet'}
                                </p>
                                <p className='text-sm text-slate-600 mt-2'>Payment will be processed securely</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Order Summary Sidebar */}
                <div className='lg:col-span-1'>
                    <div className='bg-white rounded-lg border border-slate-200 shadow-sm p-6 sticky top-20'>
                        <h2 className='text-lg font-bold text-slate-900 mb-4'>Order Summary</h2>
                        <div className='flex justify-between items-center mb-4'>
                            <span className='text-slate-600'>Total Amount</span>
                            <span className='text-xl font-bold text-slate-900'>{displayCurrency(orderData.total || orderData.totalAmount, currency)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center'>
                <button
                    onClick={() => navigate('/')}
                    className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors'
                >
                    Continue Shopping
                </button>
                <button
                    onClick={() => navigate('/cart')}
                    className='border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition-colors'
                >
                    View Cart
                </button>
            </div>
        </div>
    )
}

export default OrderPlaced
