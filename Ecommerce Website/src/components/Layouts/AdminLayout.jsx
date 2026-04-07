import React from 'react';
import AdminSidebar from '../AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <AdminSidebar />

      <div className="flex-1 overflow-auto md:ml-64 p-4 pb-20 md:pb-6">
        {children}
      </div>

    </div>
  );
};

export default AdminLayout;