import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiClock, FiStar } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <FiTruck className="w-8 h-8" />,
      title: 'Fast Delivery',
      description: 'Get your groceries delivered within 2 hours'
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: 'Quality Guaranteed',
      description: 'Fresh products with quality assurance'
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: '24/7 Support',
      description: 'Round the clock customer support'
    },
    {
      icon: <FiStar className="w-8 h-8" />,
      title: 'Best Prices',
      description: 'Competitive prices on all products'
    }
  ];



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Fresh Groceries
                <span className="block text-blue-200">Delivered to You</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Shop from our wide selection of fresh fruits, vegetables, dairy, and more. 
                Fast delivery right to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="btn btn-lg bg-white text-blue-600 hover:bg-blue-50"
                >
                  Shop Now
                  <FiArrowRight className="ml-2" />
                </Link>
                {!user ? (
                  <Link
                    to="/register"
                    className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    Sign Up Free
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    View Profile
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg mb-3"></div>
                      <h3 className="font-semibold text-gray-900">Fresh Fruits</h3>
                      <p className="text-gray-600 text-sm">From $2.99</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="w-12 h-12 bg-green-600 rounded-lg mb-3"></div>
                      <h3 className="font-semibold text-gray-900">Organic Veggies</h3>
                      <p className="text-gray-600 text-sm">From $1.99</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="w-12 h-12 bg-yellow-600 rounded-lg mb-3"></div>
                      <h3 className="font-semibold text-gray-900">Dairy Products</h3>
                      <p className="text-gray-600 text-sm">From $3.99</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="w-12 h-12 bg-red-600 rounded-lg mb-3"></div>
                      <h3 className="font-semibold text-gray-900">Fresh Meat</h3>
                      <p className="text-gray-600 text-sm">From $8.99</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the best grocery shopping experience with quality products and excellent service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their grocery needs. 
            {!user ? 'Sign up today and get your first order delivered for free!' : 'Start shopping now and enjoy fast delivery!'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <Link
                to="/register"
                className="btn btn-lg bg-white text-blue-600 hover:bg-blue-50"
              >
                Get Started
              </Link>
            ) : (
              <Link
                to="/products"
                className="btn btn-lg bg-white text-blue-600 hover:bg-blue-50"
              >
                Start Shopping
              </Link>
            )}
            <Link
              to="/products"
              className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-blue-600"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 