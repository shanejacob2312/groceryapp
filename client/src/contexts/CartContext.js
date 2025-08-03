import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product._id === product._id);
      
      if (existingItem) {
        // Update quantity if item already exists
        const updatedCart = prevCart.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        
        toast.success(`Updated ${product.name} quantity`);
        return updatedCart;
      } else {
        // Add new item to cart
        const newItem = {
          product,
          quantity,
          price: product.discount > 0 ? product.discountedPrice : product.price
        };
        
        toast.success(`${product.name} added to cart`);
        return [...prevCart, newItem];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const item = prevCart.find(item => item.product._id === productId);
      if (item) {
        toast.success(`${item.product.name} removed from cart`);
      }
      return prevCart.filter(item => item.product._id !== productId);
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared');
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartSubtotal = () => {
    return getCartTotal();
  };

  const getTax = () => {
    return getCartSubtotal() * 0.08; // 8% tax
  };

  const getShipping = () => {
    return getCartSubtotal() > 50 ? 0 : 5; // Free shipping over $50
  };

  const getGrandTotal = () => {
    return getCartSubtotal() + getTax() + getShipping();
  };

  const isCartEmpty = () => {
    return cart.length === 0;
  };

  const getCartItems = () => {
    return cart;
  };

  const getCartItem = (productId) => {
    return cart.find(item => item.product._id === productId);
  };

  const value = {
    cart,
    loading,
    setLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
    getCartSubtotal,
    getTax,
    getShipping,
    getGrandTotal,
    isCartEmpty,
    getCartItems,
    getCartItem
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 