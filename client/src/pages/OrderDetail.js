import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProductImage from '../components/ui/ProductImage';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordersAPI.getById(id);
      console.log('Order response:', response.data);
      setOrder(response.data.order);
    } catch (err) {
      setError('Failed to load order');
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-purple-600 bg-purple-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (!order) return <div className="text-center">Order not found</div>;

  // Ensure order.items is an array
  const orderItems = order.items && Array.isArray(order.items) ? order.items : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:text-blue-700 flex items-center"
        >
          ← Back to Orders
        </button>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order #{order._id ? order._id.slice(-8) : 'N/A'}</h1>
              <p className="text-gray-600">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {orderItems.length === 0 ? (
                  <p className="text-gray-500">No items found in this order.</p>
                ) : (
                  orderItems.map((item, index) => (
                    <div key={item._id || index} className="flex items-center space-x-4 border-b border-gray-200 pb-4">
                      <ProductImage
                        src={item.image || '/placeholder-product.svg'}
                        alt={item.name || 'Product'}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name || 'Product'}</h3>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${((item.price || 0) * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-600">${(item.price || 0).toFixed(2)} each</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>${(order.total || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-4">Delivery Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">Delivery Address</p>
                  <p className="text-gray-600">{order.deliveryAddress?.street}</p>
                  <p className="text-gray-600">
                    {order.deliveryAddress?.city}, {order.deliveryAddress?.state} {order.deliveryAddress?.zipCode}
                  </p>
                </div>
                
                <div>
                  <p className="font-medium">Payment Method</p>
                  <p className="text-gray-600">{order.paymentMethod}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail; 