import React, { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'
import { Search, ArrowLeft } from 'lucide-react'
import useTitle from '../hooks/useTitle'

const SearchProduct = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const urlSearch = new URLSearchParams(location.search)
    const searchTerm = urlSearch.get('q') || ''
    
    useTitle(searchTerm ? `Search: ${searchTerm}` : 'Search Products')

    const fetchProduct = useCallback(async () => {
        setLoading(true)
        try {
            const response = await fetch(SummaryApi.searchProduct.url + location.search)
            const dataResponse = await response.json()
            setData(dataResponse.data || [])
        } catch (error) {
            console.error("Error fetching search results:", error)
            setData([])
        } finally {
            setLoading(false)
        }
    }, [location.search])

    useEffect(() => {
        fetchProduct()
        setSearchQuery(searchTerm)
    }, [fetchProduct, searchTerm])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/search?q=${searchQuery}`)
        }
    }

    return (
        <div className='container mx-auto p-4 min-h-[calc(100vh-120px)]'>
            {/* Search Header */}
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
                <div className='flex items-center gap-3'>
                    <button 
                        onClick={() => navigate(-1)}
                        className='p-2 hover:bg-slate-100 rounded-full transition-colors'
                    >
                        <ArrowLeft className='w-6 h-6 text-slate-600' />
                    </button>
                    <div>
                        <h1 className='text-2xl font-bold text-slate-800'>
                            {searchTerm ? `Search results for "${searchTerm}"` : 'Search Products'}
                        </h1>
                        <p className='text-slate-500 text-sm'>
                            {loading ? 'Searching...' : `Found ${data.length} products`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Results */}
            {loading ? (
                <div className='grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] justify-center gap-6'>
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className='bg-white rounded-xl h-80 animate-pulse border border-slate-100'></div>
                    ))}
                </div>
            ) : data.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-200'>
                    <div className='w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4'>
                        <Search className='w-10 h-10 text-slate-300' />
                    </div>
                    <h3 className='text-xl font-semibold text-slate-700 mb-2'>No products found</h3>
                    <p className='text-slate-500 text-center max-w-xs'>
                        We couldn't find any products matching your search. Try different keywords or browse categories.
                    </p>
                    <button 
                        onClick={() => navigate('/')}
                        className='mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium'
                    >
                        Go back home
                    </button>
                </div>
            ) : (
                <VerticalCard data={data} loading={loading} />
            )}
        </div>
    )
}

export default SearchProduct
