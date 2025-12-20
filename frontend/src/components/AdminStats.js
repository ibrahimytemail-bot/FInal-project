import React, { useEffect, useState } from 'react';
import { MdShoppingCart, MdPeople, MdInventory2 } from 'react-icons/md';
import SummaryApi from '../common';

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch all products
      const productsRes = await fetch(SummaryApi.allProduct.url);
      const productsData = await productsRes.json();
      
      // Fetch all users
      const usersRes = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: 'include'
      });
      const usersData = await usersRes.json();

      const uniqueCategories = new Set();
      if (productsData?.data) {
        productsData.data.forEach(product => {
          if (product.category) uniqueCategories.add(product.category);
        });
      }

      setStats({
        totalProducts: productsData?.data?.length || 0,
        totalUsers: usersData?.data?.length || 0,
        totalCategories: uniqueCategories.size || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: MdInventory2,
      color: 'bg-blue-100',
      textColor: 'text-tech-blue',
      borderColor: 'border-tech-blue',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: MdPeople,
      color: 'bg-green-100',
      textColor: 'text-green-600',
      borderColor: 'border-green-600',
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: MdShoppingCart,
      color: 'bg-orange-100',
      textColor: 'text-orange-600',
      borderColor: 'border-orange-600',
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4'>
      {statCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`${card.color} border-2 ${card.borderColor} rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow`}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-slate-600 text-sm font-medium'>{card.title}</p>
                <p className={`text-3xl font-bold ${card.textColor} mt-2`}>
                  {loading ? '-' : card.value}
                </p>
              </div>
              <Icon className={`text-5xl ${card.textColor} opacity-20`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminStats;
