import React, { useEffect, useState } from "react";
import API from "../../Service/api";
import { FiCheck, FiTruck, FiClock } from "react-icons/fi";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/api/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  // ✅ STATUS STYLE
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-600";
      case "Shipped":
        return "bg-gray-200 text-gray-700";
      case "Pending":
        return "bg-orange-100 text-orange-600";
      case "Completed":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  // ✅ STATUS ICON
  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <FiCheck />;
      case "Shipped":
        return <FiTruck />;
      case "Pending":
        return <FiClock />;
      case "Completed":
        return <FiCheck />;
      default:
        return null;
    }
  };

  // ✅ UPDATE STATUS API
  const handleStatusUpdate = async (id, status) => {
    try {
      await API.put(`/api/orders/${id}`, { status });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status } : o
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Orders ({orders.length})
      </h1>

      <div className="bg-white rounded-lg shadow border overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs md:text-sm text-gray-600 uppercase tracking-wider">
              <th className="p-3 md:p-4">Order</th>
              <th className="p-3 md:p-4">Customer</th>
              <th className="p-3 md:p-4">Items</th>
              <th className="p-3 md:p-4">Total</th>
              <th className="p-3 md:p-4">Status</th>
              <th className="p-3 md:p-4">Date</th>
              <th className="p-3 md:p-4">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {orders.map((order, index) => {
              
              // 🔥 IMPORTANT FIX (old orders handle)
              const status = order.status || "Pending";

              return (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  
                  <td className="p-2 md:p-4 font-medium">
                    ORD-{index + 1}
                  </td>

                  <td className="p-2 md:p-4">
                    <p className="font-semibold">
                      {order.user?.name || "Guest"}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                      {order.user?.email || "No Email"}
                    </p>
                  </td>

                  <td className="p-2 md:p-4 text-gray-600">
                    {order.items?.length || 0} items
                  </td>

                  <td className="p-2 md:p-4 font-semibold text-sm md:text-base">
                    ₹{order.totalAmount}
                  </td>

                  {/* ✅ STATUS FIX */}
                  <td className="p-2 md:p-4">
                    <span
                      className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs flex items-center gap-1 w-fit ${getStatusStyle(status)}`}
                    >
                      {getStatusIcon(status)}
                      {status}
                    </span>
                  </td>

                  <td className="p-2 md:p-4 text-gray-500 text-xs md:text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* ✅ ACTION FIX */}
                  <td className="p-2 md:p-4 flex flex-wrap gap-1 md:gap-2">
                    
                    {status === "Pending" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(order._id, "Shipped")
                        }
                        className="px-2 md:px-3 py-1 border rounded hover:bg-gray-100 text-xs md:text-sm"
                      >
                        Mark Shipped
                      </button>
                    )}

                    {status === "Shipped" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(order._id, "Delivered")
                        }
                        className="px-2 md:px-3 py-1 border rounded hover:bg-gray-100 text-xs md:text-sm"
                      >
                        Mark Delivered
                      </button>
                    )}

                    {status === "Delivered" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(order._id, "Completed")
                        }
                        className="px-2 md:px-3 py-1 border rounded hover:bg-gray-100 text-xs md:text-sm"
                      >
                        Mark Completed
                      </button>
                    )}

                    {status === "Completed" && (
                      <span className="text-gray-400 text-xs md:text-sm">
                        Completed
                      </span>
                    )}

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;