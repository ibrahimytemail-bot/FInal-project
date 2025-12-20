import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart, FaHeadphones, FaCamera, FaPrint, FaMicrochip } from "react-icons/fa";
import { BsSmartwatch, BsMouse } from "react-icons/bs";
import { MdTv, MdHeadset } from "react-icons/md";
import { IoVolumeHigh, IoMenu, IoClose } from "react-icons/io5";
import { TbFridge, TbDeviceMobile, TbMoustache } from "react-icons/tb";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import { currencyConfig } from '../helpers/displayCurrency';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if (data.error) {
      toast.error(data.message)
    }
  }

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)

    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate("/search")
    }
  }

  return (
    <header className='bg-[#003566] h-16 shadow-md fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4'>

        {/* Logo - Always on left */}
        <div className="hover:cursor-pointer flex-shrink-0">
          <Link to="/">
            <Logo w={90} h={90} />
          </Link>
        </div>

        {/* Desktop/Tablet: Catalog + Search Bar (Original Design) */}
        <div className='hidden md:flex items-center ml-52 w-[40%] max-w-2xl mx-auto'>
          {/* Catalog Button */}
          <button
            onMouseOver={() => document.getElementById('catalogMenu').classList.remove('hidden')}
            onMouseOut={() => document.getElementById('catalogMenu').classList.add('hidden')}
            className='h-11 px-4 bg-[#1976d2] flex items-center justify-center rounded-l-full text-white hover:bg-[#42a5f5] transition-colors whitespace-nowrap relative'
          >
            <p className='text-md font-semibold'>Catalog</p>
          </button>

          {/* Search Input + Button */}
          <div className='flex-1 flex items-center w-full h-9'>
            <input
              type='text'
              placeholder='Search products...'
              className='flex-1 h-full w-full outline-none bg-transparent text-white px-4 border border-white/40 border-x-0'
              onChange={handleSearch}
              value={search}
            />
            <button className='h-full px-4 bg-[#1976d2] flex items-center justify-center rounded-r-full text-white hover:bg-[#42a5f5] transition-colors'>
              <GrSearch className='w-5 h-5' />
            </button>
          </div>

          {/* Catalog Dropdown (Desktop) */}
          <div
            id='catalogMenu'
            className='hidden absolute top-full left-3/2 -translate-x-3/2 -mt-1 bg-white rounded-lg shadow-xl border border-gray-200 w-64 z-50'
            onMouseOver={() => document.getElementById('catalogMenu').classList.remove('hidden')}
            onMouseOut={() => document.getElementById('catalogMenu').classList.add('hidden')}
          >
            <div className='py-2'>
              <Link to="/product-category?category=airpodes" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors'>
                <MdHeadset className='w-5 h-5 text-cyan-600'/>
                <span className='font-medium text-slate-700'>Airpods</span>
              </Link>
              <Link to="/product-category?category=earphones" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors'>
                <FaHeadphones className='w-5 h-5 text-cyan-600'/>
                <span className='font-medium text-slate-700'>Wired Earphones</span>
              </Link>
              <Link to="/product-category?category=mobile" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors'>
                <TbDeviceMobile className='w-5 h-5 text-cyan-600'/>
                <span className='font-medium text-slate-700'>Mobiles</span>
              </Link>
              <Link to="/product-category?category=televisions" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors'>
                <MdTv className='w-5 h-5 text-cyan-600'/>
                <span className='font-medium text-slate-700'>Smart TVs</span>
              </Link>
              <Link to="/product-category?category=trimmers" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors'>
                <TbMoustache className='w-5 h-5 text-cyan-600'/>
                <span className='font-medium text-slate-700'>Trimmers</span>
              </Link>
              <Link to="/product-category?category=processor" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors'>
                <FaMicrochip className='w-5 h-5 text-cyan-600'/>
                <span className='font-medium text-slate-700'>Processors</span>
              </Link>
              <Link to="/product-category?category=printers" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors'>
                <FaPrint className='w-5 h-5 text-cyan-600'/>
                <span className='font-medium text-slate-700'>Printers</span>
              </Link>
              <Link to="/product-category?category=watches" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors'>
                <BsSmartwatch className='w-5 h-5 text-cyan-600'/>
                <span className='font-medium text-slate-700'>Smart Watches</span>
              </Link>
              <Link to="/product-category?category=camera" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors'>
                <FaCamera className='w-5 h-5 text-cyan-600'/>
                <span className='font-medium text-slate-700'>Cameras</span>
              </Link>
              <Link to="/product-category?category=speakers" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors'>
                <IoVolumeHigh className='w-5 h-5 text-cyan-600'/>
                <span className='font-medium text-slate-700'>Speakers</span>
              </Link>
              <Link to="/product-category?category=refrigerator" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors'>
                <TbFridge className='w-5 h-5 text-cyan-600'/>
                <span className='font-medium text-slate-700'>Refrigerators</span>
              </Link>
              <Link to="/product-category?category=Mouse" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors'>
                <BsMouse className='w-5 h-5 text-cyan-600'/>
                <span className='font-medium text-slate-700'>Computer Mouses</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile: Centered Search Bar */}
        <div className='md:hidden flex-1 px-4 mt-4 h-[50px] w-[150px] mx-auto'>
          <div className='h-9 bg-transparent border border-white/40 rounded-full flex items-center px-5 shadow-lg'>
            <input
              type='text'
              placeholder='Search here...'
              className='flex-1 h-full outline-none bg-transparent text-white placeholder-white/70 text-sm'
              onChange={handleSearch}
              value={search}
            />
            <div className='flex bg-[#1976d2] items-center px-4 py-2.5 -ml-16 rounded-r-full '>
            <GrSearch className='w-5 h-5 text-white' />
            </div>
          </div>
        </div>

        {/* Desktop: Right Side Actions */}
        <div className='hidden md:flex items-center gap-4'>
          {/* Currency Selector */}
          <div className='relative group'>
            <button className='flex items-center gap-1 px-3 py-2 cursor-pointer hover:outline hover:outline-[#1976d2] transition text-white rounded-sm '>
              <span className='text-sm font-bold flex items-center gap-1'>
                {currencyConfig[context?.currency]?.flag} {context?.currency}
              </span>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </button>
            <div className='hidden group-hover:block absolute top-full right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 w-40 z-50 overflow-hidden'>
              {Object.keys(currencyConfig).map((curr) => (
                <button
                  key={curr}
                  onClick={() => context?.setCurrency(curr)}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-slate-100 transition-colors flex items-center justify-between ${context?.currency === curr ? 'text-tech-blue bg-blue-50' : 'text-slate-700'}`}
                >
                  <span className='flex items-center gap-2'>
                    <span className='text-lg'>{currencyConfig[curr].flag}</span>
                    <span>{curr}</span>
                  </span>
                  <span className='text-slate-400 font-bold'>{currencyConfig[curr].symbol}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Shopping Cart */}
          <Link to={"/cart"} className='text-lg px-3 py-1 cursor-pointer hover:outline hover:outline-[#1976d2] transition transition-colors flex items-center justify-center rounded-sm text-white'>
            <p className='text-md font-semibold text-white'>Cart</p>
            <FaShoppingCart className='w-6 h-6'/>
            <p className='text-sm font-semibold ml-2 mb-2'>{context?.cartProductCount}</p>
          </Link>

          {/* Login / User */}
          <div className='flex items-center gap-3'>
            {user?._id ? (
              <div className='relative group'>
                <div className='flex items-center gap-2 text-white cursor-pointer hover:outline hover:outline-[#1976d2] transition px-3 py-1.5 rounded-sm'>
                  <div className='text-2xl relative flex justify-center'>
                    {user?.profilePic ? (
                      <img src={user?.profilePic} className='w-8 h-8 rounded-full object-cover' alt={user?.name} />
                    ) : (
                      <FaRegCircleUser />
                    )}
                  </div>
                  <p className='text-sm font-medium hidden md:block animate-fadeIn'>Hi, {user?.name}</p>
                  <svg className="w-4 h-4 fill-current hidden md:block" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>

                <div className='hidden group-hover:block absolute top-full right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 w-48 z-50 overflow-hidden animate-fadeIn'>
                  <div className='p-3 border-b border-slate-100 bg-slate-50'>
                    <p className='text-xs text-slate-500 font-medium uppercase tracking-wider'>Account</p>
                    <p className='text-sm font-bold text-slate-900 truncate'>{user?.name}</p>
                    <p className='text-xs text-slate-500 truncate'>{user?.email}</p>
                  </div>
                  <nav className='py-1'>
                    {user?.role === ROLE.ADMIN && (
                      <Link to={"/admin-panel/all-products"} className='block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-tech-blue transition-colors'>Admin Panel</Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className='w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors'
                    >
                      Logout
                    </button>
                  </nav>
                </div>
              </div>
            ) : (
              <Link to={"/login"} className='px-3 py-1.5 rounded-sm text-white cursor-pointer hover:outline hover:outline-[#1976d2] transition'>Login</Link>
            )}
          </div>
        </div>

        {/* Mobile: Hamburger Menu Button - Always on right */}
        <button
          onClick={() => setMenuDisplay(prev => !prev)}
          className='md:hidden text-white text-3xl flex-shrink-0 z-50'
        >
          {menuDisplay ? <IoClose /> : <IoMenu />}
        </button>

        {/* Mobile Menu Overlay - unchanged */}
        {menuDisplay && (
          <div className='md:hidden absolute top-16 left-0 w-full bg-[#003566] shadow-2xl z-40 px-4 py-6 flex flex-col gap-5'>
            {/* Catalog Section */}
            <div>
              <button
                onClick={() => setMobileCatalogOpen(prev => !prev)}
                className='w-full flex justify-between items-center text-white font-semibold text-lg py-3 border-b border-white/20'
              >
                Catalog
                <svg className={`w-5 h-5 transition-transform ${mobileCatalogOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </button>
              {mobileCatalogOpen && (
                <div className='bg-white rounded-lg mt-3 shadow-xl'>
                  <div className='py-2'>
                    <Link to="/product-category?category=airpodes" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors' onClick={() => setMenuDisplay(false)}>
                      <MdHeadset className='w-5 h-5 text-cyan-600'/>
                      <span className='font-medium text-slate-700'>Airpods</span>
                    </Link>
                    <Link to="/product-category?category=earphones" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors' onClick={() => setMenuDisplay(false)}>
                      <FaHeadphones className='w-5 h-5 text-cyan-600'/>
                      <span className='font-medium text-slate-700'>Wired Earphones</span>
                    </Link>
                    <Link to="/product-category?category=mobile" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors' onClick={() => setMenuDisplay(false)}>
                      <TbDeviceMobile className='w-5 h-5 text-cyan-600'/>
                      <span className='font-medium text-slate-700'>Mobiles</span>
                    </Link>
                    <Link to="/product-category?category=televisions" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors' onClick={() => setMenuDisplay(false)}>
                      <MdTv className='w-5 h-5 text-cyan-600'/>
                      <span className='font-medium text-slate-700'>Smart TVs</span>
                    </Link>
                    <Link to="/product-category?category=trimmers" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors' onClick={() => setMenuDisplay(false)}>
                      <TbMoustache className='w-5 h-5 text-cyan-600'/>
                      <span className='font-medium text-slate-700'>Trimmers</span>
                    </Link>
                    <Link to="/product-category?category=processor" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors' onClick={() => setMenuDisplay(false)}>
                      <FaMicrochip className='w-5 h-5 text-cyan-600'/>
                      <span className='font-medium text-slate-700'>Processors</span>
                    </Link>
                    <Link to="/product-category?category=printers" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors' onClick={() => setMenuDisplay(false)}>
                      <FaPrint className='w-5 h-5 text-cyan-600'/>
                      <span className='font-medium text-slate-700'>Printers</span>
                    </Link>
                    <Link to="/product-category?category=watches" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors' onClick={() => setMenuDisplay(false)}>
                      <BsSmartwatch className='w-5 h-5 text-cyan-600'/>
                      <span className='font-medium text-slate-700'>Smart Watches</span>
                    </Link>
                    <Link to="/product-category?category=camera" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors' onClick={() => setMenuDisplay(false)}>
                      <FaCamera className='w-5 h-5 text-cyan-600'/>
                      <span className='font-medium text-slate-700'>Cameras</span>
                    </Link>
                    <Link to="/product-category?category=speakers" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors' onClick={() => setMenuDisplay(false)}>
                      <IoVolumeHigh className='w-5 h-5 text-cyan-600'/>
                      <span className='font-medium text-slate-700'>Speakers</span>
                    </Link>
                    <Link to="/product-category?category=refrigerator" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors' onClick={() => setMenuDisplay(false)}>
                      <TbFridge className='w-5 h-5 text-cyan-600'/>
                      <span className='font-medium text-slate-700'>Refrigerators</span>
                    </Link>
                    <Link to="/product-category?category=Mouse" className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors' onClick={() => setMenuDisplay(false)}>
                      <BsMouse className='w-5 h-5 text-cyan-600'/>
                      <span className='font-medium text-slate-700'>Computer Mouses</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className='py-3 border-b border-white/20'>
              <p className='text-white/70 text-sm mb-2'>Currency</p>
              <select
                value={context?.currency || ''}
                onChange={(e) => context?.setCurrency(e.target.value)}
                className='w-full bg-white/10 text-white rounded-lg px-4 py-2 outline-none'
              >
                {Object.keys(currencyConfig).map((curr) => (
                  <option key={curr} value={curr}>
                    {currencyConfig[curr].flag} {curr} ({currencyConfig[curr].symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              onClick={() => setMenuDisplay(false)}
              className='flex items-center gap-4 text-white py-3 border-b border-white/20'
            >
              <FaShoppingCart className='w-7 h-7' />
              <div>
                <p className='font-semibold'>Cart</p>
                <p className='text-sm opacity-90'>{context?.cartProductCount} items</p>
              </div>
            </Link>

            {/* User / Login */}
            {user?._id ? (
              <div className='text-white'>
                <div className='flex items-center gap-4 py-4 border-b border-white/20'>
                  {user?.profilePic ? (
                    <img src={user?.profilePic} className='w-12 h-12 rounded-full object-cover' alt={user?.name} />
                  ) : (
                    <FaRegCircleUser className='w-12 h-12' />
                  )}
                  <div>
                    <p className='font-semibold'>Hi, {user?.name}</p>
                    <p className='text-sm opacity-80'>{user?.email}</p>
                  </div>
                </div>
                {user?.role === ROLE.ADMIN && (
                  <Link
                    to="/admin-panel/all-products"
                    onClick={() => setMenuDisplay(false)}
                    className='block py-3 text-white/90'
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout()
                    setMenuDisplay(false)
                  }}
                  className='w-full text-left py-3 text-red-400 font-medium'
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuDisplay(false)}
                className='block text-center py-3 bg-[#1976d2] text-white rounded-lg font-semibold hover:bg-[#42a5f5] transition'
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header