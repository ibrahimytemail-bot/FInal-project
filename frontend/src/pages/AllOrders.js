import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import displayCurrency from '../helpers/displayCurrency'
import moment from 'moment'
import Context from '../context'

const AllOrders = () => {
  const [orders, setOrders] = useState([])
  const { currency } = useContext(Context)

  const fetchOrders = async () => {
    const response = await fetch(SummaryApi.allOrder.url,{
        method : SummaryApi.allOrder.method,
        credentials : 'include'
    })
    const dataResponse = await response.json()

    if(dataResponse.success){
      setOrders(dataResponse.data)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Orders</h2>
      </div>

      <div className='p-4 overflow-x-auto'>
        <table className='w-full userTable'>
          <thead>
            <tr className='bg-black text-white'>
              <th>Sr.</th>
              <th>Order Id</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map((order, index) => {
                return (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order?._id}</td>
                    <td>{order?.shippingDetails?.fullName}</td>
                    <td>{order?.shippingDetails?.email}</td>
                    <td>{order?.shippingDetails?.phoneNumber}</td>
                    <td>{displayCurrency(order?.totalAmount, currency)}</td>
                    <td className='font-semibold'>{order?.orderStatus}</td>
                    <td>{moment(order?.createdAt).format('LL')}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllOrders
