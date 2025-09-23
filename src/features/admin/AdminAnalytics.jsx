import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const AdminAnalytics = () => {
  const [products, setProducts] = useState([]);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
    setProducts(adminProducts);

    const mockSales = [
      { month: "Jan", sales: 5, revenue: 2000 },
      { month: "Feb", sales: 8, revenue: 3500 },
      { month: "Mar", sales: 12, revenue: 5000 },
      { month: "Apr", sales: 6, revenue: 2800 },
      { month: "May", sales: 15, revenue: 7000 },
    ];
    setSalesData(mockSales);
  }, []);

  const totalSales = salesData.reduce((acc, cur) => acc + cur.sales, 0);
  const totalRevenue = salesData.reduce((acc, cur) => acc + cur.revenue, 0);

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-6">📊 Admin Analytics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 shadow">
          <h3 className="text-sm text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold text-green-700">{products.length}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 shadow">
          <h3 className="text-sm text-gray-500">Total Sales</h3>
          <p className="text-2xl font-bold text-yellow-700">{totalSales}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 shadow">
          <h3 className="text-sm text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-blue-700">₹{totalRevenue}</p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Revenue Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminAnalytics;


