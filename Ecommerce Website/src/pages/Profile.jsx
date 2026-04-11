import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiUser, FiMapPin, FiCreditCard, FiLock, FiLogOut } from 'react-icons/fi';
import ManageAddress from './ManageAddress';
import PaymentMethod from './PaymentMethod';
import PasswordManager from './PasswordManager';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Personal Information');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'Female'
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ')[1] || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || 'Female'
      });
      setPreviewImage(user.avatar || null);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedName = `${formData.firstName} ${formData.lastName}`.trim();
    updateUser({
      name: updatedName,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      avatar: previewImage 
    });
    alert("Profile Updated!");
  };

  const menuItems = [
    { name: 'Personal Information', icon: <FiUser /> },
    { name: 'Manage Address', icon: <FiMapPin /> },
    { name: 'Payment Method', icon: <FiCreditCard /> },
    { name: 'Password Manager', icon: <FiLock /> },
    { name: 'Logout', icon: <FiLogOut /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-10 flex flex-col md:flex-row gap-6 md:gap-10 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      
      {/* Sidebar */}
      <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-visible">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              if (item.name === 'Logout') {
                const confirmLogout = window.confirm("Are you sure you want to logout?");
                if (confirmLogout) {
                  logout();
                  navigate('/');
                }
              } else {
                setActiveTab(item.name);
              }
            }}
            className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold whitespace-nowrap transition-all ${
              activeTab === item.name && item.name !== 'Logout'
                ? 'bg-[#FFC107] text-[#1F3E35] shadow-lg scale-105' 
                : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700 hover:bg-gray-50'
            } ${item.name === 'Logout' ? 'text-red-500 md:mt-5 hover:bg-red-50 dark:hover:bg-red-900/20' : ''}`}
          >
            {item.icon} {item.name}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        
        {activeTab === 'Personal Information' && (
          <div className="max-w-2xl animate-fade-in mx-auto md:mx-0">
            
            {/* Avatar */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-8 md:mb-10 group">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {previewImage ? (
                  <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <FiUser size={40} className="text-gray-300" />
                )}
              </div>
              
              <label htmlFor="fileInput" className="absolute bottom-1 right-1 bg-[#1F3E35] text-white p-2 rounded-full cursor-pointer border-2 border-white dark:border-gray-900">
                <FiEdit2 size={14} />
                <input type="file" id="fileInput" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold dark:text-gray-300">First Name *</label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  className="p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl dark:text-white outline-none" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold dark:text-gray-300">Last Name *</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  className="p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl dark:text-white outline-none" 
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold dark:text-gray-300">Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  readOnly 
                  className="p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-400 cursor-not-allowed" 
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold dark:text-gray-300">Phone *</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  className="p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl dark:text-white outline-none" 
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold dark:text-gray-300">Gender *</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange} 
                  className="p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl dark:text-white"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>

              <button type="submit" className="mt-4 bg-[#1F3E35] text-white px-6 md:px-10 py-3 md:py-4 rounded-full font-bold w-full sm:w-fit">
                Update Changes
              </button>

            </form>
          </div>
        )}

        {activeTab === 'Manage Address' && <ManageAddress />}
        {activeTab === 'Payment Method' && <PaymentMethod />}
        {activeTab === 'Password Manager' && <PasswordManager />}
      </div>
    </div>
  );
};

export default Profile;