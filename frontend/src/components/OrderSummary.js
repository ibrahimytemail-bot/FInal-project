import React, { useContext } from 'react'
import displayCurrency from '../helpers/displayCurrency'
import Context from '../context'

const OrderSummary = ({ 
  totalQty = 0, 
  subtotal = 0, 
  shipping = 0, 
  tax = 0,
  loading = false,
  children
}) => {
  const { currency } = useContext(Context)
  const total = subtotal + shipping + tax

  if (loading) {
    return (
      <div className='bg-white rounded-lg border border-slate-200 shadow-sm p-4 h-auto animate-pulse'>
        <div className='h-6 bg-slate-200 rounded mb-4'></div>
        <div className='space-y-3'>
          <div className='h-4 bg-slate-200 rounded'></div>
          <div className='h-4 bg-slate-200 rounded'></div>
          <div className='h-4 bg-slate-200 rounded'></div>
          <div className='h-8 bg-slate-200 rounded mt-4'></div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden'>
      {/* Header */}
      <div className='bg-gradient-to-r from-red-600 to-red-700 px-4 py-3'>
        <h2 className='text-white font-bold text-lg'>Order Summary</h2>
      </div>

      {/* Content */}
      <div className='p-4 space-y-3'>
        {/* Items Count */}
        <div className='flex justify-between items-center pb-3 border-b border-slate-200'>
          <span className='text-slate-600'>Items ({totalQty})</span>
          <span className='font-semibold text-slate-900'>
            {displayCurrency(subtotal, currency)}
          </span>
        </div>

        {/* Shipping */}
        <div className='flex justify-between items-center'>
          <span className='text-slate-600'>Shipping</span>
          <span className='font-semibold text-slate-900'>
            {shipping === 0 ? 'Free' : displayCurrency(shipping, currency)}
          </span>
        </div>

        {/* Tax */}
        <div className='flex justify-between items-center pb-3 border-b border-slate-200'>
          <span className='text-slate-600'>Tax (GST)</span>
          <span className='font-semibold text-slate-900'>
            {displayCurrency(tax, currency)}
          </span>
        </div>

        {/* Total */}
        <div className='flex justify-between items-center pt-2'>
          <span className='text-lg font-bold text-slate-900'>Total</span>
          <span className='text-2xl font-bold text-red-600'>
            {displayCurrency(total, currency)}
          </span>
        </div>

        {/* Children (typically buttons) */}
        {children && (
          <div className='mt-4 pt-4 border-t border-slate-200'>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderSummary
