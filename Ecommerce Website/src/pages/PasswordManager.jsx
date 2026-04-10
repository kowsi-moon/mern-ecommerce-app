import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const PasswordManager = () => {
  const { user, loading } = useAuth(); // Loading state context-la irundhu edukkuroam
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. New Password Verification
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("New passwords do not match!");
    }

    try {
      // 2. Token extraction with safety check
      const token = user?.token; 
      if (!token) {
        return toast.error("User not authenticated. Please login again.");
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      // 3. Backend API Call
      const response = await axios.put(
        'http://localhost:5000/api/users/update-password', 
        { 
          currentPassword: formData.currentPassword, 
          newPassword: formData.newPassword 
        }, 
        config
      );

      toast.success(response.data.message);
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error updating password";
      toast.error(errorMsg);
    }
  };

  // --- MUKKIYAMANA FIX ---
  // Page refresh aagum bodhu context innum user-ai load pannala na, 
  // 'null' error varaama irukka indha loading screen help pannum.
  if (loading) {
    return <div className="p-10 text-center font-bold text-gray-600">Loading Password Manager...</div>;
  }

  if (!user) {
    return <div className="p-10 text-center text-red-500">Please login to access this section.</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 w-full max-w-xl">
      <h2 className="text-2xl font-bold text-[#0E1F1A] mb-2">Change Password</h2>
      <p className="text-sm text-gray-500 mb-8">Update your password to keep your account secure</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-[#0E1F1A] mb-2">Current Password</label>
          <input 
            type="password" 
            className="w-full bg-[#F9F9F8] border border-gray-200 rounded-md p-3 outline-none focus:border-[#1F3E35]"
            placeholder="Enter current password"
            value={formData.currentPassword}
            onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0E1F1A] mb-2">New Password</label>
          <input 
            type="password" 
            className="w-full bg-[#F9F9F8] border border-gray-200 rounded-md p-3 outline-none focus:border-[#1F3E35]"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0E1F1A] mb-2">Confirm New Password</label>
          <input 
            type="password" 
            className="w-full bg-[#F9F9F8] border border-gray-200 rounded-md p-3 outline-none focus:border-[#1F3E35]"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required 
          />
        </div>

        <button type="submit" className="bg-[#1F3E35] text-white px-8 py-3 rounded-md font-bold hover:bg-[#162c26] transition-all">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default PasswordManager;