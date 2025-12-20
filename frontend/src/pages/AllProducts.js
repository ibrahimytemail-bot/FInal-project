import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'
import productCategory from '../helpers/productCategory'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(SummaryApi.allProduct.url)
      const dataResponse = await response.json()
      setAllProduct(dataResponse?.data || [])
      filterProducts(dataResponse?.data || [], selectedCategory, searchTerm)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const filterProducts = (products, category, search) => {
    let filtered = products;

    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category)
    }

    if (search) {
      filtered = filtered.filter(p =>
        p.productName.toLowerCase().includes(search.toLowerCase()) ||
        p.brandName.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])

  useEffect(() => {
    filterProducts(allProduct, selectedCategory, searchTerm)
  }, [selectedCategory, searchTerm, allProduct])

  return (
    <div className='w-full'>
      <div className='bg-white py-4 px-6 flex justify-between items-center rounded-lg shadow-md mb-4'>
        <div>
          <h2 className='font-bold text-2xl text-slate-900'>All Products</h2>
          <p className='text-sm text-slate-600 mt-1'>Manage and edit your product catalog</p>
        </div>
        <button
          className='bg-tech-blue text-white px-6 py-3 rounded-lg hover:bg-tech-blue-dark transition-colors font-semibold flex items-center gap-2'
          onClick={() => setOpenUploadProduct(true)}
        >
          + Upload Product
        </button>
      </div>

      {/* Search and Filter */}
      <div className='bg-white p-4 rounded-lg shadow-md mb-4'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-1'>
            <input
              type='text'
              placeholder='Search by product name or brand...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tech-blue'
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className='px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tech-blue bg-white'
          >
            <option value='all'>All Categories</option>
            {productCategory.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        <p className='text-sm text-slate-600 mt-3'>
          Showing {filteredProducts.length} of {allProduct.length} products
        </p>
      </div>

      {/* Products Grid */}
      <div className='grid mb-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <AdminProductCard
              data={product}
              key={index + "allProduct"}
              fetchdata={fetchAllProduct}
            />
          ))
        ) : (
          <div className='col-span-full text-center py-12 bg-white rounded-lg'>
            <p className='text-slate-600 text-lg'>No products found</p>
            <p className='text-slate-500 text-sm mt-2'>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Upload Product Modal */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  )
}

export default AllProducts
