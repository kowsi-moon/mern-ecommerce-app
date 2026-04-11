import React, { useState } from 'react';
import { FiMapPin, FiTrash2, FiPlus } from 'react-icons/fi';

const ManageAddress = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: 'Home',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    label: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddAddress = () => {
    if (newAddress.label && newAddress.street && newAddress.city && newAddress.state && newAddress.zip) {
      setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
      setNewAddress({ label: '', street: '', city: '', state: '', zip: '' });
      setShowAddForm(false);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  return (
    <div className="bg-[#fefefd] dark:bg-gray-900 min-h-screen p-4 sm:p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3E35] dark:text-white">Addresses</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
              Manage your saved addresses
            </p>
          </div>

          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center justify-center gap-2 bg-[#1F3E35] text-white px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all shadow-sm w-full sm:w-auto"
          >
            <FiPlus />
            Add
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-700 mb-8 shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold text-[#1F3E35] dark:text-gray-100 mb-6">New Address</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-[#1F3E35] dark:text-gray-300">Label</label>
                <input type="text" name="label" value={newAddress.label} onChange={handleInputChange}
                  className="p-3 sm:p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-2xl outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-[#1F3E35] dark:text-gray-300">Street</label>
                <input type="text" name="street" value={newAddress.street} onChange={handleInputChange}
                  className="p-3 sm:p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-2xl outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#1F3E35] dark:text-gray-300">City</label>
                <input type="text" name="city" value={newAddress.city} onChange={handleInputChange}
                  className="p-3 sm:p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-2xl outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#1F3E35] dark:text-gray-300">State</label>
                <input type="text" name="state" value={newAddress.state} onChange={handleInputChange}
                  className="p-3 sm:p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-2xl outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-[#1F3E35] dark:text-gray-300">ZIP Code</label>
                <input type="text" name="zip" value={newAddress.zip} onChange={handleInputChange}
                  className="p-3 sm:p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-2xl outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
              <button 
                onClick={handleAddAddress}
                className="bg-[#1F3E35] text-white px-8 py-3 rounded-full font-medium w-full sm:w-auto"
              >
                Save Address
              </button>

              <button 
                onClick={() => setShowAddForm(false)}
                className="text-[#1F3E35] dark:text-gray-400 font-medium w-full sm:w-auto text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Address List */}
        <div className="grid gap-4 sm:gap-6">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div 
                key={address.id}
                className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-3xl border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shadow-inner"
              >
                
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                  <FiMapPin size={20} className="text-[#1F3E35] dark:text-gray-300" />
                </div>

                <div className="flex-1">
                  <p className="font-bold text-base sm:text-lg text-[#1F3E35] dark:text-gray-100">
                    {address.label}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm break-words">
                    {address.street}, {address.city}, {address.state} {address.zip}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button 
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                  >
                    <FiTrash2 />
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-20 text-gray-500 border border-gray-100 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-800 shadow-inner">
              <FiMapPin size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg">No saved addresses yet.</p>
              <button onClick={() => setShowAddForm(true)} className="text-amber-600 mt-2 font-medium">
                Add your first address
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAddress;