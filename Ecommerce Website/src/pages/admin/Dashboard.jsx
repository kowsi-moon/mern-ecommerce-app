import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiDollarSign, FiShoppingCart, FiPackage, FiUsers } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({ revenue: 0, orders: 0, users: 0, products: 0 });
  const [loading, setLoading] = useState(true);
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [salesByCategoryData, setSalesByCategoryData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch Data from APIs
        const productsRes = await axios.get('http://localhost:5000/api/products');
        const ordersRes = await axios.get('http://localhost:5000/api/orders');
        
        const products = productsRes.data;
        const orders = ordersRes.data;

        // Fetch Users logic
        let usersCount = 0;
        try {
          const usersRes = await axios.get('http://localhost:5000/api/users');
          usersCount = usersRes.data.length;
        } catch (e) { usersCount = 0; }

        // 1. Total Revenue from ACTUAL Orders
        const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

        // Update Stats
        setStats({
          revenue: totalRevenue,
          orders: orders.length,
          users: usersCount,
          products: products.length
        });

        // 2. Format Recent Orders for the Table
        setRecentOrders(formatOrdersData(orders.slice(0, 5)));

        // Charts data
        setMonthlySalesData(calculateMonthlySales(orders)); // Sales based on orders
        setSalesByCategoryData(calculateSalesByCategory(products));

      } catch (err) {
        console.error("Dashboard fetching error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate monthly sales based on Order dates
  const calculateMonthlySales = (orders) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, index) => ({
      month,
      sales: orders.reduce((total, o) => {
        const oMonth = new Date(o.createdAt).getMonth();
        return oMonth === index ? total + (o.totalAmount || 0) : total;
      }, 0)
    }));
  };

  const calculateSalesByCategory = (products) => {
    const categoryMap = {};
    products.forEach(product => {
      categoryMap[product.category] = (categoryMap[product.category] || 0) + (product.price || 0);
    });
    return Object.entries(categoryMap).map(([category, value]) => ({
      name: category,
      value: parseFloat(value)
    }));
  };

  // --- STRICT FIX FOR PRODUCT NAME AND AMOUNT ---
  const formatOrdersData = (orders) => {
    return orders.map((order, index) => {
      // Pulling first item name from items array
      const firstItemName = order.items && order.items.length > 0 
        ? order.items[0].name 
        : 'Unknown Product';

      const productDisplay = order.items && order.items.length > 1 
        ? `${firstItemName} (+${order.items.length - 1} more)`
        : firstItemName;

      return {
        id: order._id || index,
        productName: productDisplay,
        amount: `₹${(order.totalAmount || 0).toLocaleString()}`,
        date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A',
        status: order.status || 'Pending' // Dynamic status from DB
      };
    });
  };

  if (loading) return <div className="p-10 font-sans text-[#2d5a4d] text-lg italic animate-pulse">Loading Real-time Data...</div>;

  const COLORS = ['#2d5a4d', '#4a7c6f', '#6b9d8a', '#8cbfa5', '#add1c0'];

  return (
    <main className="p-10 font-sans bg-gray-50 min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[#1F3E35]">
          LUXORA Dashboard
        </h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Revenue" value={`₹${stats.revenue.toLocaleString()}`} icon={<FiDollarSign size={28} />} color="text-green-600" />
        <StatCard title="Total Orders" value={stats.orders} icon={<FiShoppingCart size={28} />} color="text-blue-600" />
        <StatCard title="Total Products" value={stats.products} icon={<FiPackage size={28} />} color="text-amber-600" />
        <StatCard title="Total Users" value={stats.users} icon={<FiUsers size={28} />} color="text-purple-600" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-[#1F3E35]">Monthly Revenue Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySalesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Line type="monotone" dataKey="sales" stroke="#2d5a4d" strokeWidth={3} dot={{ r: 4, fill: '#2d5a4d' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-[#1F3E35]">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={salesByCategoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {salesByCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-[#1F3E35]">Recent Orders</h2>
        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm text-gray-500 font-mono">#{order.id.toString().slice(-6)}</td>
                    <td className="p-4 text-sm text-[#1F3E35] font-semibold">{order.productName}</td>
                    <td className="p-4 text-sm font-bold">{order.amount}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                        order.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-400 text-sm italic">No orders found in the database.</p>
          </div>
        )}
      </section>
    </main>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex items-start gap-5 hover:shadow-md transition-all">
    <div className={`${color} p-3 bg-gray-50 rounded-lg`}>{icon}</div>
    <div>
      <p className="text-[10px] text-gray-400 uppercase tracking-[2px] font-bold">{title}</p>
      <p className="text-2xl font-bold text-[#1F3E35] mt-1">{value}</p>
    </div>
  </div>
);

export default Dashboard;