import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit, MdDelete } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    })

    const fetchAllUsers = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            })

            const dataResponse = await fetchData.json()

            if (dataResponse.success) {
                setAllUsers(dataResponse.data)
                setFilteredUsers(dataResponse.data)
            }

            if (dataResponse.error) {
                toast.error(dataResponse.message)
            }
        } catch (error) {
            console.error("Error fetching users:", error)
            toast.error("Failed to fetch users")
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    useEffect(() => {
        const filtered = allUser.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredUsers(filtered)
    }, [searchTerm, allUser])

    const handleDeleteUser = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(SummaryApi.deleteUser.url, {
                method: SummaryApi.deleteUser.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    userId: updateUserDetails._id
                })
            });

            const responseData = await response.json();

            if (responseData.success) {
                toast.success("User deleted successfully");
                setShowDeleteModal(false);
                fetchAllUsers();
            } else {
                toast.error(responseData.message || "Failed to delete user");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete user");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className='w-full'>
            <div className='bg-white py-4 px-6 rounded-lg shadow-md mb-4'>
                <div className='mb-4'>
                    <h2 className='font-bold text-2xl text-slate-900'>All Users</h2>
                    <p className='text-sm text-slate-600 mt-1'>Manage user roles and permissions</p>
                </div>
                <input
                    type='text'
                    placeholder='Search users by name or email...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tech-blue'
                />
                <p className='text-sm text-slate-600 mt-3'>
                    Showing {filteredUsers.length} of {allUser.length} users
                </p>
            </div>

            <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-slate-900 text-white'>
                                <th className='px-6 py-4 text-left text-sm font-semibold'>Sr.</th>
                                <th className='px-6 py-4 text-left text-sm font-semibold'>Name</th>
                                <th className='px-6 py-4 text-left text-sm font-semibold'>Email</th>
                                <th className='px-6 py-4 text-left text-sm font-semibold'>Role</th>
                                <th className='px-6 py-4 text-left text-sm font-semibold'>Joined Date</th>
                                <th className='px-6 py-4 text-left text-sm font-semibold'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, index) => (
                                    <tr key={user._id} className='border-b border-slate-200 hover:bg-slate-50 transition-colors'>
                                        <td className='px-6 py-4 text-sm text-slate-900'>{index + 1}</td>
                                        <td className='px-6 py-4 text-sm text-slate-900 font-medium'>{user?.name}</td>
                                        <td className='px-6 py-4 text-sm text-slate-600'>{user?.email}</td>
                                        <td className='px-6 py-4 text-sm'>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                user?.role === 'ADMIN' 
                                                    ? 'bg-red-100 text-red-700' 
                                                    : 'bg-blue-100 text-blue-700'
                                            }`}>
                                                {user?.role}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 text-sm text-slate-600'>
                                            {moment(user?.createdAt).format('DD MMM YYYY')}
                                        </td>
                                        <td className='px-6 py-4 text-sm'>
                                            <div className='flex gap-2'>
                                                <button
                                                    className='flex items-center gap-1 px-3 py-2 bg-green-100 text-green-600 hover:bg-green-600 hover:text-white rounded-lg transition-colors font-semibold'
                                                    onClick={() => {
                                                        setUpdateUserDetails(user)
                                                        setOpenUpdateRole(true)
                                                    }}
                                                >
                                                    <MdModeEdit /> Edit
                                                </button>
                                                <button
                                                    className='flex items-center gap-1 px-3 py-2 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors font-semibold'
                                                    onClick={() => {
                                                        setUpdateUserDetails(user)
                                                        setShowDeleteModal(true)
                                                    }}
                                                >
                                                    <MdDelete /> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan='6' className='px-6 py-8 text-center text-slate-600'>
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}

            {showDeleteModal && (
                <DeleteConfirmationModal
                    title="Delete User"
                    message={`Are you sure you want to delete the user "${updateUserDetails.name}" (${updateUserDetails.email})? This action cannot be undone.`}
                    onConfirm={handleDeleteUser}
                    onCancel={() => setShowDeleteModal(false)}
                    isLoading={isDeleting}
                    confirmButtonText="Delete User"
                />
            )}
        </div>
    )
}

export default AllUsers
