import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'
import { ChevronDown, Filter, X } from 'lucide-react'
import useTitle from '../hooks/useTitle'

const CategoryProduct = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const categoryArray = urlSearch.getAll("category")

    const categoryName = categoryArray.length > 0 ? categoryArray[0].charAt(0).toUpperCase() + categoryArray[0].slice(1) : 'Category'
    useTitle(`${categoryName} Products`)

    const urlCategoryListObject = {}
    categoryArray.forEach(el => {
        urlCategoryListObject[el] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])
    const [sortBy, setSortBy] = useState("")
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch(SummaryApi.filterProduct.url, {
                method: SummaryApi.filterProduct.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    category: filterCategoryList
                })
            })

            const dataResponse = await response.json()
            setData(dataResponse?.data || [])
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSelectCategory = (e) => {
        const { name, value, checked } = e.target

        setSelectCategory((preve) => {
            return {
                ...preve,
                [value]: checked
            }
        })
    }

    useEffect(() => {
        fetchData()
    }, [filterCategoryList])

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
            if (selectCategory[categoryKeyName]) {
                return categoryKeyName
            }
            return null
        }).filter(el => el)

        setFilterCategoryList(arrayOfCategory)

        const urlFormat = arrayOfCategory.map((el, index) => {
            if ((arrayOfCategory.length - 1) === index) {
                return `category=${el}`
            }
            return `category=${el}&&`
        })

        navigate("/product-category?" + urlFormat.join(""))
    }, [selectCategory])

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target

        setSortBy(value)

        if (value === 'asc') {
            setData(preve => [...preve].sort((a, b) => a.sellingPrice - b.sellingPrice))
        }

        if (value === 'dsc') {
            setData(preve => [...preve].sort((a, b) => b.sellingPrice - a.sellingPrice))
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100'>
            <div className='container mx-auto px-4 py-6 md:py-8'>
                {/* Mobile Filter Button */}
                <div className='lg:hidden mb-6'>
                    <button
                        onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                        className='flex items-center gap-2 w-full bg-white rounded-lg border border-slate-200 px-4 py-3 hover:bg-slate-50 transition-colors font-semibold text-slate-900'
                    >
                        <Filter size={20} />
                        Filters & Sort
                        <ChevronDown size={20} className={`ml-auto transition-transform ${mobileFilterOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
                    {/* Sidebar - Filters */}
                    <div className={`lg:col-span-1 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
                        <div className='bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-20'>
                            {/* Close Button (Mobile Only) */}
                            <button
                                onClick={() => setMobileFilterOpen(false)}
                                className='lg:hidden absolute top-4 right-4 text-slate-400 hover:text-slate-600'
                            >
                                <X size={24} />
                            </button>

                            {/* Sort Section */}
                            <div className='mb-8'>
                                <h3 className='text-base font-bold text-slate-900 mb-4 flex items-center gap-2'>
                                    <span className='w-1 h-6 bg-tech-blue rounded-full'></span>
                                    Sort by Price
                                </h3>

                                <form className='space-y-3'>
                                    {[
                                        { value: 'asc', label: 'Price: Low to High' },
                                        { value: 'dsc', label: 'Price: High to Low' }
                                    ].map(option => (
                                        <label key={option.value} className='flex items-center gap-3 cursor-pointer group'>
                                            <input
                                                type='radio'
                                                name='sortBy'
                                                checked={sortBy === option.value}
                                                onChange={handleOnChangeSortBy}
                                                value={option.value}
                                                className='w-4 h-4 accent-tech-blue'
                                            />
                                            <span className='text-slate-700 group-hover:text-tech-blue transition-colors'>
                                                {option.label}
                                            </span>
                                        </label>
                                    ))}
                                </form>
                            </div>

                            {/* Filter Section */}
                            <div className='border-t border-slate-200 pt-6'>
                                <h3 className='text-base font-bold text-slate-900 mb-4 flex items-center gap-2'>
                                    <span className='w-1 h-6 bg-tech-blue rounded-full'></span>
                                    Categories
                                </h3>

                                <form className='space-y-3 max-h-96 overflow-y-auto'>
                                    {productCategory.map((categoryName) => (
                                        <label
                                            key={categoryName.value}
                                            className='flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-blue-50 transition-colors'
                                        >
                                            <input
                                                type='checkbox'
                                                name={"category"}
                                                checked={selectCategory[categoryName?.value] || false}
                                                value={categoryName?.value}
                                                id={categoryName?.value}
                                                onChange={handleSelectCategory}
                                                className='w-4 h-4 accent-tech-blue rounded'
                                            />
                                            <span className='text-slate-700 group-hover:text-tech-blue transition-colors flex-1'>
                                                {categoryName?.label}
                                            </span>
                                            {selectCategory[categoryName?.value] && (
                                                <span className='inline-flex items-center justify-center w-5 h-5 bg-tech-blue text-white rounded-full text-xs font-bold'>
                                                    ✓
                                                </span>
                                            )}
                                        </label>
                                    ))}
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className='lg:col-span-3'>
                        {/* Results Header */}
                        <div className='mb-6 flex items-center justify-between'>
                            <div>
                                <h2 className='text-2xl font-bold text-slate-900'>
                                    {data.length > 0 ? `Found ${data.length} Products` : 'No Products Found'}
                                </h2>
                                {filterCategoryList.length > 0 && (
                                    <p className='text-slate-600 text-sm mt-1'>
                                        Filtered by: {filterCategoryList.map(cat => productCategory.find(c => c.value === cat)?.label).join(', ')}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Products Grid */}
                        {data.length === 0 && !loading ? (
                            <div className='bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center'>
                                <div className='inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4'>
                                    <Filter size={32} className='text-slate-400' />
                                </div>
                                <h3 className='text-xl font-bold text-slate-900 mb-2'>No Products Found</h3>
                                <p className='text-slate-600 mb-6'>
                                    Try adjusting your filters or exploring other categories
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectCategory({})
                                        setFilterCategoryList([])
                                    }}
                                    className='inline-block px-6 py-2 bg-tech-blue hover:bg-tech-blue-dark text-white rounded-lg font-semibold transition-colors'
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className='min-h-96 mb-12'>
                                <VerticalCard data={data} loading={loading} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct
