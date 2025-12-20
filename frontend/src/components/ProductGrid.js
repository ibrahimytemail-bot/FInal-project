import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategoryImages } from '../utils/productImages';
import SummaryApi from '../common';

const ProductGrid = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    
    // Fallback local images
    const localImages = getCategoryImages(category, 4);

    const fetchData = async() => {
        setLoading(true)
        try {
            const response = await fetch(SummaryApi.getHomeCategoryProduct.url, {
                method : SummaryApi.getHomeCategoryProduct.method,
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify({
                    category : category
                })
            })
            const dataResponse = await response.json()
            setData(dataResponse?.data || [])
        } catch (error) {
            console.error("Error fetching home category products:", error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [category])

    // Use database products if available, otherwise fallback to local images
    const displayItems = data.length > 0 ? data : localImages.map((url, index) => ({
        productImage: [url],
        productName: `${category.charAt(0).toUpperCase() + category.slice(1)}`,
        isLocal: true,
        _id: `local-${index}`
    }));

    return (
        <div className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col'>
            {/* Amazon-style heading */}
            <div className='p-4 pb-2'>
                <h2 className='text-lg md:text-xl font-bold text-slate-900 mb-3'>{heading}</h2>
            </div>
            
            {/* Amazon-style 2x2 product grid */}
            <div className='px-4 flex-1'>
                <div className='grid grid-cols-2 gap-x-3 gap-y-4 mb-3'>
                    {loading ? (
                        new Array(4).fill(null).map((_, index) => (
                            <div key={index} className='space-y-2'>
                                <div className='bg-slate-100 aspect-square rounded animate-pulse'></div>
                                <div className='h-3 bg-slate-100 rounded w-2/3 animate-pulse'></div>
                            </div>
                        ))
                    ) : (
                        displayItems.map((item, index) => (
                            <Link 
                                key={item._id || index} 
                                to={item.isLocal ? `/product-category?category=${category}` : `/product/${item._id}`}
                                className='group/item flex flex-col'
                            >
                                <div className='bg-slate-50 aspect-square rounded overflow-hidden flex items-center justify-center p-2 group-hover/item:bg-slate-100 transition-colors mb-1.5'>
                                    <img 
                                        src={item.productImage[0]} 
                                        alt={item.productName || `${category} product`}
                                        className='w-full h-full object-contain mix-blend-multiply group-hover/item:scale-110 transition-transform'
                                    />
                                </div>
                                <p className='text-[11px] md:text-xs text-slate-700 font-medium line-clamp-1 group-hover/item:text-orange-600 transition-colors text-center md:text-left'>
                                    {item.productName}
                                </p>
                            </Link>
                        ))
                    )}
                </div>
            </div>

            {/* Amazon-style "Shop now" link */}
            {!loading && (
                <div className='px-4 pb-4 pt-0'>
                    <Link 
                        to={`/product-category?category=${category}`}
                        className='text-sm text-cyan-700 hover:text-orange-600 hover:underline transition-colors inline-block font-medium'
                    >
                        Shop now
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ProductGrid;
