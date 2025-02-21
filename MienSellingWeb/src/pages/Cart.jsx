import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './Cart.css';
import useCart from '../hooks/useCart';
import EmptyCart from '../img/cart_banner_image.png';
const Cart = () => {
  const { cart: cartItems, removeFromCart, updateQuantity, getTotal } = useCart();
  const navigate = useNavigate(); 
  const [note, setNote] = useState('');
  const [needInvoice, setNeedInvoice] = useState(false);
  const [invoiceInfo, setInvoiceInfo] = useState({
    companyName: '',
    taxCode: '',
    email: '',
    address: ''
  });

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (note) {
        localStorage.setItem('cartNote', note);
      }
  
      navigate('/checkout');
    console.log('Proceeding to checkout...');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <h1>Giỏ hàng của bạn</h1>
          <Link to="/product" className="continue-shopping">Tiếp tục mua sắm</Link>
        </div>

        <div className="empty-cart">
          <div className="empty-cart-image">
          <img src={EmptyCart} alt="Giỏ hàng trống" />
          </div>
          <p className="empty-cart-title">Chưa có sản phẩm trong giỏ hàng...</p>
          <p className="empty-cart-text">
            Bạn có thể quay về <Link to="/home">trang chủ</Link> hoặc tìm kiếm sản phẩm
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Giỏ hàng của bạn</h1>
        <Link to="/product" className="continue-shopping">Tiếp tục mua sắm</Link>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-variant">{item.variant}</p>
                <p className="item-price">{item.price.toLocaleString()}₫</p>
              </div>

              <div className="item-actions">
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <input 
                    type="text" 
                    value={item.quantity} 
                    readOnly 
                  />
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                
                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(item.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26 26">
                    <path d="M11.5 -0.03125C9.542969 -0.03125 7.96875 1.59375 7.96875 3.5625L7.96875 4L4 4C3.449219 4 3 4.449219 3 5L3 6L2 6L2 8L4 8L4 23C4 24.644531 5.355469 26 7 26L19 26C20.644531 26 22 24.644531 22 23L22 8L24 8L24 6L23 6L23 5C23 4.449219 22.550781 4 22 4L18.03125 4L18.03125 3.5625C18.03125 1.59375 16.457031 -0.03125 14.5 -0.03125Z"/>
                  </svg>
                </button>
                
                <div className="item-total">{(item.price * item.quantity).toLocaleString()}₫</div>
              </div>
            </div>
          ))}
        </div>

        <div className="order-notes">
          <label>Ghi chú đơn hàng</label>
          <textarea 
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ghi chú về đơn hàng"
          />
        </div>

        <div className="invoice-toggle">
          <label>
            <input
              type="checkbox"
              checked={needInvoice}
              onChange={(e) => setNeedInvoice(e.target.checked)}
            />
            Xuất hoá đơn cho đơn hàng
          </label>
        </div>

        {needInvoice && (
          <div className="invoice-form">
            <Input
              placeholder="Tên công ty..."
              value={invoiceInfo.companyName}
              onChange={(e) => setInvoiceInfo({...invoiceInfo, companyName: e.target.value})}
            />
            <Input
              placeholder="Mã số thuế..."
              value={invoiceInfo.taxCode}
              onChange={(e) => setInvoiceInfo({...invoiceInfo, taxCode: e.target.value})}
            />
            <Input
              placeholder="Email..."
              value={invoiceInfo.email}
              onChange={(e) => setInvoiceInfo({...invoiceInfo, email: e.target.value})}
            />
            <Input
              placeholder="Địa chỉ công ty..."
              value={invoiceInfo.address}
              onChange={(e) => setInvoiceInfo({...invoiceInfo, address: e.target.value})}
            />
          </div>
        )}

        <div className="order-summary">
          <h2 className="summary-title">Thông tin đơn hàng</h2>
          <div className="summary-row">
            <span>Tổng tiền:</span>
            <span>{totalAmount.toLocaleString()}₫</span>
          </div>
          <div className="summary-notes">
            <p>Phí vận chuyển sẽ được tính ở trang thanh toán.</p>
            <p>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</p>
          </div>
          <button 
            className="checkout-button"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            THANH TOÁN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;