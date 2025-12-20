import React from 'react';
import { IoMdClose } from "react-icons/io";

const DeleteConfirmationModal = ({
  title = "Delete Item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  onConfirm,
  onCancel,
  isLoading = false,
  confirmButtonText = "Delete",
  isDangerous = true
}) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-50 flex justify-center items-center bg-slate-900 bg-opacity-50'>
      <div className='mx-auto bg-white shadow-lg p-6 w-full max-w-sm rounded-lg'>
        
        <button 
          className='block ml-auto mb-4 text-2xl hover:text-red-600 transition-colors'
          onClick={onCancel}
          disabled={isLoading}
        >
          <IoMdClose />
        </button>

        <h1 className='pb-4 text-xl font-bold text-slate-900'>{title}</h1>
        
        <p className='text-slate-600 mb-6 text-sm leading-relaxed'>{message}</p>

        <div className='flex gap-3 justify-end'>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className='px-4 py-2 rounded-lg bg-slate-200 text-slate-900 font-semibold hover:bg-slate-300 transition-colors disabled:opacity-50'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 ${
              isDangerous
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-tech-blue text-white hover:bg-tech-blue-dark'
            }`}
          >
            {isLoading && (
              <span className='inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin'></span>
            )}
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
