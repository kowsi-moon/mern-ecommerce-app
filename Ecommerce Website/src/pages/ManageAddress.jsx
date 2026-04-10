import React, { useState } from 'react';
import { FiMapPin, FiTrash2, FiPlus } from 'react-icons/fi';

const ManageAddress = () => {
  // --- STATE MANAGEMENT ---
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

  // --- HANDLERS ---
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
    // Uses the light cream background from your old template
    <div className="bg-[#fefefd] dark:bg-gray-900 min-h-screen p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section (Matched to Image 3/4 layout) --- */}
        <div className="flex items-center justify-between mb-8">
          <div>
            {/* Old Template Text Color: #1F3E35 */}
            <h1 className="text-3xl font-serif font-bold text-[#1F3E35] dark:text-white">Addresses</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your saved addresses</p>
          </div>
          {/* Old Template Primary Button: #1F3E35 background, White text */}
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-[#1F3E35] text-white px-6 py-3 rounded-1xl font-medium hover:bg-opacity-90 transition-all shadow-sm"
          >
            <FiPlus />
            Add
          </button>
        </div>

        {/* --- Add New Address Form Section (Matched to Image 4 layout and Old Colors) --- */}
        {showAddForm && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 mb-8 animate-fade-in shadow-lg">
            <h2 className="text-xl font-bold text-[#1F3E35] dark:text-gray-100 mb-6">New Address</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Label (Soft rounded like Image 4, Old font styles) */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-[#1F3E35] dark:text-gray-300">Label</label>
                <input type="text" name="label" value={newAddress.label} onChange={handleInputChange} placeholder="Home, Work..." className="p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-2xl outline-none focus:ring-1 focus:ring-amber-400" />
              </div>

              {/* Street */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-[#1F3E35] dark:text-gray-300">Street</label>
                <input type="text" name="street" value={newAddress.street} onChange={handleInputChange} placeholder="123 Main St" className="p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-2xl outline-none focus:ring-1 focus:ring-amber-400" />
              </div>

              {/* City (Matched to Image 4 grid) */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#1F3E35] dark:text-gray-300">City</label>
                <input type="text" name="city" value={newAddress.city} onChange={handleInputChange} placeholder="City" className="p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-2xl outline-none focus:ring-1 focus:ring-amber-400" />
              </div>

              {/* State */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#1F3E35] dark:text-gray-300">State</label>
                <input type="text" name="state" value={newAddress.state} onChange={handleInputChange} placeholder="State" className="p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-2xl outline-none focus:ring-1 focus:ring-amber-400" />
              </div>

              {/* ZIP Code */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-[#1F3E35] dark:text-gray-300">ZIP Code</label>
                <input type="text" name="zip" value={newAddress.zip} onChange={handleInputChange} placeholder="10001" className="p-4 border border-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-2xl outline-none focus:ring-1 focus:ring-amber-400" />
              </div>
            </div>

            {/* Action Buttons (Matched to Image 4, Old colors) */}
            <div className="flex items-center gap-4 mt-8">
              {/* Old Template Primary Button style */}
              <button 
                onClick={handleAddAddress}
                className="bg-[#1F3E35] text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all shadow-md"
              >
                Save Address
              </button>
              {/* Cancel Button text color: #1F3E35 */}
              <button 
                onClick={() => setShowAddForm(false)}
                className="text-[#1F3E35] dark:text-gray-400 font-medium hover:text-amber-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* --- Saved Addresses List Section (Matched to Image 3/4 Card Style and Old Colors) --- */}
        <div className="grid gap-6">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div 
                key={address.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 flex items-center gap-6 shadow-inner"
              >
                {/* --- Left Icon (Matched to Image 3 style, Old colors) --- */}
                {/* Grey circle: border and dark background utility */}
                <div className="w-14 h-14 rounded-full border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center flex-shrink-0">
                  {/* Pin icon color: gray-600 or old #1F3E35 */}
                  <FiMapPin size={24} className="text-[#1F3E35] dark:text-gray-300" />
                </div>

                {/* --- Center Text Section --- */}
                <div className="flex-1">
                  <p className="font-bold text-lg text-[#1F3E35] dark:text-gray-100">{address.label}</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                    {address.street}, {address.city}, {address.state} {address.zip}
                  </p>
                </div>

                {/* --- Right Actions (Matched to Image 3 style, Old colors) --- */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            // No addresses state
            <div className="text-center py-20 text-gray-500 border border-gray-100 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-800 shadow-inner">
              <FiMapPin size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg">No saved addresses yet.</p>
              <button onClick={() => setShowAddForm(true)} className="text-amber-600 mt-2 font-medium hover:text-amber-700 transition-colors">Add your first address</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAddress;