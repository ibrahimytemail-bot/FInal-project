import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SummaryApi from '../common'
import Context from '../context'
import OrderSummary from '../components/OrderSummary'
import { ArrowLeft } from 'lucide-react'
import displayCurrency from '../helpers/displayCurrency'
import useTitle from '../hooks/useTitle'

const Checkout = () => {
    useTitle('Checkout')
    const navigate = useNavigate()
    const context = useContext(Context)
    const { currency } = context
    const [cartData, setCartData] = useState([])
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pinCode: '',
        country: 'India',
        paymentMethod: 'card'
    })
    const [errors, setErrors] = useState({})

    const fetchCartData = async () => {
        setLoading(true)
        try {
            const response = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                credentials: 'include',
                headers: { "content-type": 'application/json' }
            })

            const responseData = await response.json()
            if (responseData.success) {
                setCartData(responseData.data)
            }
        } catch (error) {
            console.error("Error fetching cart:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCartData()
    }, [])

    const validateForm = () => {
        const newErrors = {}

        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
        if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone number must be 10 digits'
        if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required'
        if (!formData.city.trim()) newErrors.city = 'City is required'
        if (!formData.state.trim()) newErrors.state = 'State is required'
        if (!formData.pinCode.trim()) newErrors.pinCode = 'Pin code is required'
        if (!/^\d{6}$/.test(formData.pinCode)) newErrors.pinCode = 'Pin code must be 6 digits'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handlePlaceOrder = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setSubmitting(true)
        try {
            const orderItems = cartData.map(item => ({
                productId: item?.productId?._id,
                quantity: item?.quantity,
                name: item?.productId?.productName,
                price: item?.productId?.sellingPrice,
                image: item?.productId?.productImage[0]
            }))

            const subtotal = cartData.reduce((sum, item) => sum + (item.quantity * item?.productId?.sellingPrice), 0)
            const shipping = subtotal > 999 ? 0 : 99
            const tax = Math.round(subtotal * 0.05)
            const totalAmount = subtotal + shipping + tax

            const orderPayload = {
                products: orderItems,
                paymentDetails: {
                    paymentId: "",
                    payment_method_type: [formData.paymentMethod],
                    payment_status: "pending"
                },
                shippingDetails: formData,
                totalAmount: totalAmount
            }

            const response = await fetch(SummaryApi.placeOrder.url, {
                method: SummaryApi.placeOrder.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(orderPayload)
            })

            const responseData = await response.json()

            if (responseData.success) {
                // Store minimal info in localStorage for the success page if needed
                localStorage.setItem('lastOrder', JSON.stringify({
                    orderId: responseData.data._id,
                    total: totalAmount
                }))
                
                // Refresh cart count in context
                await context.fetchUserAddToCart()
                
                navigate('/order-placed')
            } else {
                console.error("Order placement failed:", responseData.message)
            }
        } catch (error) {
            console.error("Error placing order:", error)
        } finally {
            setSubmitting(false)
        }
    }

    if (cartData.length === 0 && !loading) {
        return (
            <div className='container mx-auto px-4 py-6'>
                <div className='bg-white rounded-lg border border-slate-200 shadow-sm p-12 text-center'>
                    <p className='text-slate-600 mb-4'>Your cart is empty</p>
                    <button
                        onClick={() => navigate('/cart')}
                        className='text-blue-600 hover:text-blue-700 font-semibold'
                    >
                        Go Back to Cart
                    </button>
                </div>
            </div>
        )
    }

    const subtotal = cartData.reduce((sum, item) => sum + (item.quantity * item?.productId?.sellingPrice), 0)
    const shipping = subtotal > 999 ? 0 : 99
    const tax = Math.round(subtotal * 0.05)

    return (
        <div className='container mx-auto px-4 py-6'>
            {/* Back Button */}
            <button
                onClick={() => navigate('/cart')}
                className='flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6'
            >
                <ArrowLeft size={20} />
                Back to Cart
            </button>

            {/* Header */}
            <h1 className='text-3xl font-bold text-slate-900 mb-8'>Checkout</h1>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Checkout Form */}
                <div className='lg:col-span-2'>
                    <form onSubmit={handlePlaceOrder} className='space-y-6'>
                        {/* Shipping Address Section */}
                        <div className='bg-white rounded-lg border border-slate-200 shadow-sm p-6'>
                            <h2 className='text-xl font-bold text-slate-900 mb-4'>Shipping Address</h2>
                            <div className='space-y-4'>
                                {/* Full Name */}
                                <div>
                                    <label className='block text-slate-700 font-semibold mb-2'>Full Name *</label>
                                    <input
                                        type='text'
                                        name='fullName'
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                            errors.fullName
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-slate-300 focus:ring-blue-500'
                                        }`}
                                        placeholder='John Doe'
                                    />
                                    {errors.fullName && <p className='text-red-600 text-sm mt-1'>{errors.fullName}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className='block text-slate-700 font-semibold mb-2'>Email *</label>
                                    <input
                                        type='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                            errors.email
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-slate-300 focus:ring-blue-500'
                                        }`}
                                        placeholder='john@example.com'
                                    />
                                    {errors.email && <p className='text-red-600 text-sm mt-1'>{errors.email}</p>}
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className='block text-slate-700 font-semibold mb-2'>Phone Number *</label>
                                    <input
                                        type='tel'
                                        name='phoneNumber'
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                            errors.phoneNumber
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-slate-300 focus:ring-blue-500'
                                        }`}
                                        placeholder='9876543210'
                                    />
                                    {errors.phoneNumber && <p className='text-red-600 text-sm mt-1'>{errors.phoneNumber}</p>}
                                </div>

                                {/* Address Line 1 */}
                                <div>
                                    <label className='block text-slate-700 font-semibold mb-2'>Address *</label>
                                    <input
                                        type='text'
                                        name='addressLine1'
                                        value={formData.addressLine1}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                            errors.addressLine1
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-slate-300 focus:ring-blue-500'
                                        }`}
                                        placeholder='123 Main Street'
                                    />
                                    {errors.addressLine1 && <p className='text-red-600 text-sm mt-1'>{errors.addressLine1}</p>}
                                </div>

                                {/* Address Line 2 */}
                                <div>
                                    <label className='block text-slate-700 font-semibold mb-2'>Address (Optional)</label>
                                    <input
                                        type='text'
                                        name='addressLine2'
                                        value={formData.addressLine2}
                                        onChange={handleInputChange}
                                        className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        placeholder='Apartment, suite, etc.'
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label className='block text-slate-700 font-semibold mb-2'>City *</label>
                                    <input
                                        type='text'
                                        name='city'
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                            errors.city
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-slate-300 focus:ring-blue-500'
                                        }`}
                                        placeholder='Mumbai'
                                    />
                                    {errors.city && <p className='text-red-600 text-sm mt-1'>{errors.city}</p>}
                                </div>

                                {/* State */}
                                <div>
                                    <label className='block text-slate-700 font-semibold mb-2'>State *</label>
                                    <input
                                        type='text'
                                        name='state'
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                            errors.state
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-slate-300 focus:ring-blue-500'
                                        }`}
                                        placeholder='Maharashtra'
                                    />
                                    {errors.state && <p className='text-red-600 text-sm mt-1'>{errors.state}</p>}
                                </div>

                                {/* Pin Code */}
                                <div>
                                    <label className='block text-slate-700 font-semibold mb-2'>Pin Code *</label>
                                    <input
                                        type='text'
                                        name='pinCode'
                                        value={formData.pinCode}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                            errors.pinCode
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-slate-300 focus:ring-blue-500'
                                        }`}
                                        placeholder='400001'
                                    />
                                    {errors.pinCode && <p className='text-red-600 text-sm mt-1'>{errors.pinCode}</p>}
                                </div>

                                {/* Country */}
                                <div>
                                    <label className='block text-slate-700 font-semibold mb-2'>Country</label>
                                    <input
                                        type='text'
                                        name='country'
                                        value={formData.country}
                                        disabled
                                        className='w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-100 text-slate-600'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method Section */}
                        <div className='bg-white rounded-lg border border-slate-200 shadow-sm p-6'>
                            <h2 className='text-xl font-bold text-slate-900 mb-4'>Payment Method</h2>
                            <div className='space-y-3'>
                                {[
                                    { value: 'card', label: 'Credit/Debit Card' },
                                    { value: 'upi', label: 'UPI' },
                                    { value: 'netbanking', label: 'Net Banking' },
                                    { value: 'wallet', label: 'Digital Wallet' }
                                ].map(method => (
                                    <label key={method.value} className='flex items-center gap-3 cursor-pointer p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors'>
                                        <input
                                            type='radio'
                                            name='paymentMethod'
                                            value={method.value}
                                            checked={formData.paymentMethod === method.value}
                                            onChange={handleInputChange}
                                            className='w-4 h-4'
                                        />
                                        <span className='font-medium text-slate-900'>{method.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <button
                            type='submit'
                            disabled={submitting}
                            className='w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white font-bold py-3 rounded-lg transition-colors'
                        >
                            {submitting ? 'Processing...' : 'Place Order'}
                        </button>
                    </form>
                </div>

                {/* Order Review */}
                <div className='lg:col-span-1'>
                    <div className='bg-white rounded-lg border border-slate-200 shadow-sm p-6 sticky top-20'>
                        <h2 className='text-lg font-bold text-slate-900 mb-4'>Order Review</h2>
                        
                        {/* Items */}
                        <div className='space-y-3 mb-4 max-h-64 overflow-y-auto'>
                            {cartData.map(item => (
                                <div key={item._id} className='flex justify-between items-start pb-3 border-b border-slate-200 last:border-0'>
                                    <div className='flex-1'>
                                        <p className='font-medium text-slate-900 line-clamp-2'>{item?.productId?.productName}</p>
                                        <p className='text-sm text-slate-500'>Qty: {item.quantity}</p>
                                    </div>
                                    <p className='font-semibold text-slate-900'>
                                        {displayCurrency(item.quantity * item?.productId?.sellingPrice, currency)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <OrderSummary
                            totalQty={cartData.reduce((sum, item) => sum + item.quantity, 0)}
                            subtotal={subtotal}
                            shipping={shipping}
                            tax={tax}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
