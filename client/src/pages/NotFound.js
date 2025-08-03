import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-primary-600">404</span>
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-secondary-600 mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to shopping!
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="btn btn-primary btn-lg w-full"
          >
            <FiHome className="w-5 h-5 mr-2" />
            Go to Home
          </Link>
          
          <Link
            to="/products"
            className="btn btn-outline btn-lg w-full"
          >
            <FiShoppingCart className="w-5 h-5 mr-2" />
            Browse Products
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn btn-secondary btn-lg w-full"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        <div className="mt-8 text-sm text-secondary-500">
          <p>Need help? Contact our support team</p>
          <a href="mailto:support@grocerystore.com" className="text-primary-600 hover:text-primary-500">
            support@grocerystore.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 