import React, { useContext, useState } from 'react'
import { MdModeEditOutline, MdDelete, MdStar, MdStarBorder, MdTrendingUp, MdHome, MdOutlineHome } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import displayCurrency from '../helpers/displayCurrency';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const { currency } = useContext(Context);

    const handleDeleteProduct = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(SummaryApi.deleteProduct.url, {
                method: SummaryApi.deleteProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    _id: data._id
                })
            });

            const responseData = await response.json();

            if (responseData.success) {
                toast.success("Product deleted successfully");
                setShowDeleteModal(false);
                fetchdata();
            } else {
                toast.error(responseData.message || "Failed to delete product");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete product");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleToggleStatus = async (field, currentValue) => {
        setIsUpdating(true);
        try {
            const response = await fetch(SummaryApi.updateProduct.url, {
                method: SummaryApi.updateProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    ...data,
                    [field]: !currentValue
                })
            });

            const responseData = await response.json();

            if (responseData.success) {
                toast.success(`Product ${field} status updated`);
                fetchdata();
            } else {
                toast.error(responseData.message || "Failed to update product");
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Failed to update product");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-200'>
            <div className='w-full'>
                <div className='w-full h-40 flex justify-center items-center bg-slate-100 rounded-lg mb-4 overflow-hidden relative group'>
                    <img 
                        src={data?.productImage[0]} 
                        alt={data.productName}
                        className='mx-auto object-cover h-full w-full'
                    />   
                    
                    {/* Status Badges */}
                    <div className='absolute top-2 left-2 flex flex-col gap-1'>
                        {data.featured && (
                            <span className='bg-yellow-400 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm flex items-center gap-1'>
                                <MdStar size={12}/> FEATURED
                            </span>
                        )}
                        {data.bestSelling && (
                            <span className='bg-tech-blue text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm flex items-center gap-1'>
                                <MdTrendingUp size={12}/> BEST SELLER
                            </span>
                        )}
                        {data.showOnHome && (
                            <span className='bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm flex items-center gap-1'>
                                <MdHome size={12}/> HOME GRID
                            </span>
                        )}
                    </div>
                </div> 
                
                <h1 className='text-ellipsis line-clamp-2 font-semibold text-slate-900 mb-2'>
                    {data.productName}
                </h1>
                
                <p className='text-xs text-slate-600 mb-3'>{data.category}</p>

                <div className='mb-4'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='text-xs text-slate-500'>Price</p>
                            <p className='font-semibold line-through text-slate-600'>
                                {displayCurrency(data.price, currency)}
                            </p>
                            <p className='font-bold text-tech-blue text-lg'>
                                {displayCurrency(data.sellingPrice, currency)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Toggle Buttons */}
                <div className='flex flex-wrap gap-2 mb-3'>
                    <button 
                        disabled={isUpdating}
                        className={`flex-1 min-w-[80px] flex items-center justify-center gap-1 text-[10px] p-1.5 rounded border transition-all ${data.featured ? 'bg-yellow-50 border-yellow-400 text-yellow-600' : 'bg-white border-slate-200 text-slate-500 hover:border-yellow-400 hover:text-yellow-600'}`}
                        onClick={() => handleToggleStatus('featured', data.featured)}
                    >
                        {data.featured ? <MdStar /> : <MdStarBorder />} Featured
                    </button>
                    <button 
                        disabled={isUpdating}
                        className={`flex-1 min-w-[80px] flex items-center justify-center gap-1 text-[10px] p-1.5 rounded border transition-all ${data.bestSelling ? 'bg-blue-50 border-tech-blue text-tech-blue' : 'bg-white border-slate-200 text-slate-500 hover:border-tech-blue hover:text-tech-blue'}`}
                        onClick={() => handleToggleStatus('bestSelling', data.bestSelling)}
                    >
                        <MdTrendingUp /> Best Selling
                    </button>
                    <button 
                        disabled={isUpdating}
                        className={`flex-1 min-w-[80px] flex items-center justify-center gap-1 text-[10px] p-1.5 rounded border transition-all ${data.showOnHome ? 'bg-green-50 border-green-500 text-green-600' : 'bg-white border-slate-200 text-slate-500 hover:border-green-500 hover:text-green-600'}`}
                        onClick={() => handleToggleStatus('showOnHome', data.showOnHome)}
                    >
                        {data.showOnHome ? <MdHome /> : <MdOutlineHome />} Home Grid
                    </button>
                </div>

                <div className='flex gap-2'>
                    <button 
                        className='flex-1 flex items-center justify-center gap-2 p-2 bg-green-100 hover:bg-green-600 text-green-600 hover:text-white rounded-lg transition-colors font-semibold'
                        onClick={() => setEditProduct(true)}
                    >
                        <MdModeEditOutline /> Edit
                    </button>
                    <button 
                        className='flex-1 flex items-center justify-center gap-2 p-2 bg-red-100 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition-colors font-semibold'
                        onClick={() => setShowDeleteModal(true)}
                    >
                        <MdDelete /> Delete
                    </button>
                </div>
            </div>
            
            {editProduct && (
                <AdminEditProduct 
                    productData={data} 
                    onClose={() => setEditProduct(false)} 
                    fetchdata={fetchdata}
                />
            )}

            {showDeleteModal && (
                <DeleteConfirmationModal
                    title="Delete Product"
                    message={`Are you sure you want to delete "${data.productName}"? This action cannot be undone.`}
                    onConfirm={handleDeleteProduct}
                    onCancel={() => setShowDeleteModal(false)}
                    isLoading={isDeleting}
                    confirmButtonText="Delete Product"
                />
            )}
        </div>
    );
}

export default AdminProductCard;