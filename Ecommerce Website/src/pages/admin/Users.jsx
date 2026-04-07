import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
      } catch (err) {
        console.error("Users fetching error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div className="p-10 text-lg text-[#1F3E35]">Loading Users...</div>;

  return (
    <main className="p-4 md:p-10 font-sans bg-gray-50 min-h-screen">
      <header className="mb-6 md:mb-10">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-8">Users</h1>
        <div className="mb-4 md:mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Users ({users.length})</h2>
        </div>
      </header>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-white">
              <th className="text-left p-3 md:p-4 font-semibold text-gray-700 text-xs md:text-sm">Name</th>
              <th className="text-left p-3 md:p-4 font-semibold text-gray-700 text-xs md:text-sm">Email</th>
              <th className="text-left p-3 md:p-4 font-semibold text-gray-700 text-xs md:text-sm">Role</th>
              <th className="text-left p-3 md:p-4 font-semibold text-gray-700 text-xs md:text-sm">Total Orders</th>
              <th className="text-left p-3 md:p-4 font-semibold text-gray-700 text-xs md:text-sm">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-2 md:p-4 text-sm md:text-base font-semibold text-gray-900">{user.name}</td>
                <td className="p-2 md:p-4 text-sm md:text-base text-gray-600">{user.email}</td>
                <td className="p-2 md:p-4">
                  <span className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm font-semibold ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-2 md:p-4 text-sm md:text-base font-semibold text-gray-900">
                  {user.orderCount || 0}
                </td>
                <td className="p-2 md:p-4 text-sm md:text-base text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Users;