import React, { useContext } from 'react'
import { MdDelete } from "react-icons/md";
import { Plus, Minus } from 'lucide-react';
import displayCurrency from '../helpers/displayCurrency'
import Context from '../context'

const CartItem = ({ product, onIncrease, onDecrease, onDelete }) => {
  const { currency } = useContext(Context)
  return (
    <div className='w-full bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-4 flex gap-4'>
      {/* Product Image */}
      <div className='w-32 h-32 bg-slate-100 rounded-lg flex-shrink-0 overflow-hidden'>
        <img 
          src={product?.productId?.productImage[0]} 
          alt={product?.productId?.productName}
          className='w-full h-full object-scale-down mix-blend-multiply' 
        />
      </div>

      {/* Product Details */}
      <div className='flex-1 flex flex-col justify-between'>
        <div>
          <h3 className='text-lg font-semibold text-slate-900 line-clamp-2'>
            {product?.productId?.productName}
          </h3>
          <p className='text-sm text-slate-500 capitalize mt-1'>
            {product?.productId?.category}
          </p>
        </div>

        {/* Price and Quantity */}
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-1'>
            <p className='text-red-600 font-bold text-lg'>
              {displayCurrency(product?.productId?.sellingPrice, currency)}
            </p>
            <p className='text-slate-600 text-sm'>
              Total: {displayCurrency(product?.productId?.sellingPrice * product?.quantity, currency)}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className='flex items-center gap-3 border border-slate-200 rounded-lg p-2'>
            <button 
              onClick={() => onDecrease(product?._id, product?.quantity)}
              className='text-slate-600 hover:text-red-600 hover:bg-red-50 p-1 rounded transition-colors'
              disabled={product?.quantity <= 1}
            >
              <Minus size={18} />
            </button>
            <span className='w-6 text-center font-semibold text-slate-900'>
              {product?.quantity}
            </span>
            <button 
              onClick={() => onIncrease(product?._id, product?.quantity)}
              className='text-slate-600 hover:text-green-600 hover:bg-green-50 p-1 rounded transition-colors'
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(product?._id)}
        className='text-red-600 hover:bg-red-50 rounded-lg p-2 transition-colors'
        title="Remove from cart"
      >
        <MdDelete size={24} />
      </button>
    </div>
  )
}

export default CartItem
