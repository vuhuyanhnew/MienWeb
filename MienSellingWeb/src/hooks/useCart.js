import { useState, useEffect } from 'react';

const useCart = () => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when hook is initialized
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const saveCart = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

const addToCart = (product) => {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
    if (existingItemIndex !== -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += product.quantity;
      saveCart(newCart);
    } else {
      saveCart([...cart, product]);
    }
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    saveCart(newCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const newCart = cart.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    saveCart(newCart);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotal
  };
};

export default useCart;