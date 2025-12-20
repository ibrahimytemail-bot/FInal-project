import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { MdDashboard, MdInventory2, MdPeople, MdAssignmentReturn, MdRateReview } from "react-icons/md";
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import ROLE from '../common/role';
import AdminStats from '../components/AdminStats';
import useTitle from '../hooks/useTitle'

const AdminPanel = () => {
    useTitle('Admin Dashboard')
    const user = useSelector(state => state?.user?.user)
    const isLoading = useSelector(state => state?.user?.isLoading)
    const navigate = useNavigate()
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        if (!isLoading && user?.role !== ROLE.ADMIN) {
            navigate("/login")
        }
    }, [user, navigate, isLoading])

    if(isLoading){
      return <div className='flex items-center justify-center min-h-[calc(100vh-120px)]'>Loading...</div>
    }

    if (!isLoading && user?.role !== ROLE.ADMIN) {
        return null
    }

    const isDashboard = location.pathname === '/admin-panel' || location.pathname === '/admin-panel/'

    const navItems = [
        {
            name: 'Dashboard',
            path: '/admin-panel',
            icon: MdDashboard
        },
        {
            name: 'All Products',
            path: '/admin-panel/all-products',
            icon: MdInventory2
        },
        {
            name: 'All Users',
            path: '/admin-panel/all-users',
            icon: MdPeople
        },
        {
            name: 'All Orders',
            path: '/admin-panel/all-orders',
            icon: MdAssignmentReturn
        },
        {
            name: 'All Reviews',
            path: '/admin-panel/all-reviews',
            icon: MdRateReview
        }
    ]

    return (
        <div className='min-h-[calc(110vh-125px)] flex'>
            {/* Sidebar */}
            <aside className={`bg-slate-900 text-white min-h-full relative transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
                {/* User Profile Section */}
                <div className='p-4 border-b border-slate-700'>
                    <div className='flex items-center gap-3'>
                        <div className='w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0'>
                            {user?.profilePic ? (
                                <img src={user?.profilePic} className='w-12 h-12 rounded-full object-cover' alt={user?.name} />
                            ) : (
                                <FaRegCircleUser className='text-xl' />
                            )}
                        </div>
                        {isOpen && (
                            <div className='flex-1 min-w-0'>
                                <p className='font-semibold text-sm truncate'>{user?.name}</p>
                                <p className='text-xs text-slate-400'>Admin</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className='p-4 flex flex-col gap-2'>
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.path
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                    isActive
                                        ? 'bg-tech-blue text-white'
                                        : 'text-slate-300 hover:bg-slate-800'
                                }`}
                                title={!isOpen ? item.name : ''}
                            >
                                <Icon className='text-xl flex-shrink-0' />
                                {isOpen && <span className='text-sm font-medium'>{item.name}</span>}
                            </Link>
                        )
                    })}
                </nav>

                {/* Toggle Button */}
                <div className='absolute bottom-4 left-0 right-0 px-4'>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='w-full flex items-center justify-center px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors'
                    >
                        {isOpen ? '← Collapse' : '→'}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className='flex-1 bg-slate-100 overflow-auto'>
                {isDashboard ? (
                    <div className='p-4 md:p-6'>
                        <div className='mb-6'>
                            <h1 className='text-4xl font-bold text-slate-900'>Welcome to Admin Dashboard</h1>
                            <p className='text-slate-600 mt-2'>Manage products, users, and orders from here</p>
                        </div>
                        <AdminStats />
                    </div>
                ) : (
                    <div className='p-4 md:p-6'>
                        <Outlet />
                    </div>
                )}
            </main>
        </div>
    )
}

export default AdminPanel
