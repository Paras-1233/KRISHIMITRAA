import React, { useEffect, useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line 
} from "recharts";

const AdminAnalytics = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [period, setPeriod] = useState("monthly"); // "monthly" or "daily"

  const fetchAnalytics = async (selectedPeriod) => {
  try {
    const endpoint =
      selectedPeriod === "daily"
        ? "http://localhost:5000/api/analytics/daily"  // ✅ daily endpoint
        : "http://localhost:5000/api/analytics";      // monthly endpoint

    const res = await fetch(endpoint);
    const data = await res.json();

    setTotalProducts(data.totalProducts);
    setTotalSales(data.totalSales);
    setTotalRevenue(data.totalRevenue);

    // Sort daily data by date
    if (selectedPeriod === "daily") {
      const sortedDaily = data.dailySalesArray.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setSalesData(sortedDaily);
    } else {
      setSalesData(data.monthlySalesArray);
    }
  } catch (err) {
    console.error("Failed to fetch analytics:", err);
  }
};

  useEffect(() => {
    fetchAnalytics(period);
  }, [period]);

  const downloadPDF = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/analytics/pdf?period=${period}`
      );
      if (!res.ok) throw new Error("Failed to download PDF");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `admin_analytics_${period}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-4">📊 Admin Analytics</h2>

      {/* Period Toggle */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setPeriod("monthly")}
          className={`px-4 py-2 rounded ${
            period === "monthly" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setPeriod("daily")}
          className={`px-4 py-2 rounded ${
            period === "daily" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Daily
        </button>

        <button
          onClick={downloadPDF}
          className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 shadow">
          <h3 className="text-sm text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold text-green-700">{totalProducts}</p>
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

      {/* Sales Bar Chart */}
      <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          {period === "monthly" ? "Monthly Sales" : "Daily Sales"}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={period === "monthly" ? "month" : "date"} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Growth Line Chart */}
      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          {period === "monthly" ? "Revenue Growth" : "Daily Revenue Growth"}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={period === "monthly" ? "month" : "date"} />
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
