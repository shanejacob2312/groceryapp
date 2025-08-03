import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { FiShoppingCart } from 'react-icons/fi';
import ProductImage from '../ui/ProductImage';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!product || !product.inStock) return;
    
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const formatPrice = (price) => {
    return `$${(price || 0).toFixed(2)}`;
  };

  // Handle missing product data
  if (!product) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 bg-white">
        <div className="text-gray-500">Product not available</div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-t-lg">
        <ProductImage
          src={product.image || product.images?.[0] || '/placeholder-product.svg'}
          alt={product.name || 'Product'}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              -{product.discount}%
            </span>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-gray-500 mb-2">
          {product.category || 'General'}
        </div>

        {/* Product Name */}
        <Link to={`/products/${product._id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {product.name || 'Product Name'}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {product.discount > 0 ? (
              <>
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(product.discountedPrice || product.price)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500">
            per {product.unit || 'unit'}
          </span>
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {product.inStock ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">
                  In Stock ({product.stock || 0})
                </span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs text-red-600">Out of Stock</span>
              </>
            )}
          </div>
          {product.isOrganic && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Organic</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding}
          className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
            product.inStock && !isAdding
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isAdding ? (
            'Adding...'
          ) : (
            <>
              <FiShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </>
          )}
        </button>

        {/* Quick Info */}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <span>Free delivery</span>
          </div>
          {product.brand && (
            <span className="font-medium">{product.brand}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 