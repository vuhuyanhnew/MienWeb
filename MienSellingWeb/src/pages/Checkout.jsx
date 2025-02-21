import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Radio, message } from 'antd';
import emailjs from '@emailjs/browser';
import useCart from '../hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';
import './Checkout.css';

const { Option } = Select;

const Checkout = () => {
  const { cart, getTotal, getCartNote, clearCartNote, clearCart } = useCart();
  const [shippingProvince, setShippingProvince] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleProvinceChange = (value) => {
    setShippingProvince(value);
    form.setFieldsValue({ district: null, ward: null });
  };

  useEffect(() => {
    const cartNote = getCartNote();
    if (cartNote) {
      form.setFieldsValue({ note: cartNote });
      clearCartNote();
    }
  }, []);

  const formatOrderDetails = (cart) => {
    return cart.map(item => `
      Sản phẩm: ${item.name}
      Biến thể: ${item.variant || 'Không có'}
      Số lượng: ${item.quantity}
      Giá: ${item.price.toLocaleString()}₫
      -------------------
    `).join('\n');
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const fullAddress = `${values.address}, ${values.ward}, ${values.district}, ${values.province}`;
      
      const templateParams = {
        // Thông tin khách hàng
        customer_name: values.fullName,
        customer_email: values.email,
        customer_phone: values.phone,
        customer_address: fullAddress,
        
        // Thông tin đơn hàng
        order_details: formatOrderDetails(cart),
        total_amount: `${getTotal().toLocaleString()}₫`,
        payment_method: paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản ngân hàng',
        
        // Thông tin bổ sung
        order_date: new Date().toLocaleString('vi-VN'),
        order_id: `ORD${Date.now()}`,
      };

      // Gửi email
      await emailjs.send(
        'service_02uqgtt',
        'template_g3kwsdi',
        templateParams,
        'qU5zkPePsoW6ItOV8'
      );

      message.success('Đặt hàng thành công!');
      clearCart(); 
      navigate('/home'); 
    } catch (error) {
      console.error('Error:', error);
      message.error('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <div className="wrap">
        {/* Sidebar with Order Summary */}
        <div className="sidebar">
          <div className="sidebar-content">
            <div className="order-summary">
              <h2>Thông tin đơn hàng</h2>
              <div className="order-summary-sections">
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>Hình ảnh</th>
                      <th>Mô tả</th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id} className="product">
                        <td className="product-image">
                          <div className="product-thumbnail">
                            <img src={item.image} alt={item.name} />
                            <span className="product-thumbnail-quantity">{item.quantity}</span>
                          </div>
                        </td>
                        <td className="product-description">
                          <span className="product-description-name">{item.name}</span>
                          <span className="product-description-variant">{item.variant}</span>
                        </td>
                        <td className="product-quantity">{item.quantity}</td>
                        <td className="product-price">
                          <span>{item.price.toLocaleString()}₫</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Discount Code Section */}
                <div className="discount-section">
                  <div className="field">
                    <div className="field-input-btn-wrapper">
                      <Input placeholder="Mã giảm giá" />
                      <button className="field-input-btn">Sử dụng</button>
                    </div>
                  </div>
                </div>

                {/* Total Calculations */}
                <div className="total-lines">
                  <table className="total-line-table">
                    <tbody>
                      <tr className="total-line">
                        <td>Tạm tính</td>
                        <td>{getTotal().toLocaleString()}₫</td>
                      </tr>
                      <tr className="total-line">
                        <td>Phí vận chuyển</td>
                        <td>—</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="total-line">
                        <td>Tổng cộng</td>
                        <td>
                          <span className="payment-due-currency">VND</span>
                          <span className="payment-due-price">{getTotal().toLocaleString()}₫</span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Main Content */}
        <div className="main">
          <div className="main-header">
            <Link to="/" className="logo">
              <h1 className="logo-text">Thông Tin</h1>
            </Link>
            <ul className="breadcrumb">
              <li><Link to="/cart">Giỏ hàng</Link></li>
              <li>Thông tin giao hàng</li>
            </ul>
          </div>

          <div className="main-content">
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <div className="section">
                <h2>Thông tin giao hàng</h2>
                
                <Form.Item 
                  name="fullName" 
                  rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                >
                  <Input placeholder="Họ và tên" />
                </Form.Item>

                <div className="field-group">
                  <Form.Item 
                    name="email" 
                    rules={[
                      { required: true, message: 'Vui lòng nhập email!' },
                      { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>

                  <Form.Item 
                    name="phone" 
                    rules={[
                      { required: true, message: 'Vui lòng nhập số điện thoại!' },
                      { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
                    ]}
                  >
                    <Input placeholder="Số điện thoại" />
                  </Form.Item>
                </div>

                <Form.Item 
                  name="address" 
                  rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                >
                  <Input placeholder="Địa chỉ" />
                </Form.Item>

                <div className="field-group">
                  <Form.Item 
                    name="province" 
                    rules={[{ required: true, message: 'Vui lòng nhập tỉnh/thành phố!' }]}
                  >
                    <Input placeholder="Tỉnh/Thành phố" />
                  </Form.Item>

                  <Form.Item 
                    name="district" 
                    rules={[{ required: true, message: 'Vui lòng nhập quận/huyện!' }]}
                  >
                    <Input placeholder="Quận/Huyện" />
                  </Form.Item>

                  <Form.Item 
                    name="ward" 
                    rules={[{ required: true, message: 'Vui lòng nhập phường/xã!' }]}
                  >
                    <Input placeholder="Phường/Xã" />
                  </Form.Item>
                </div>
              </div>

              <div className="section payment-method">
                <h2>Phương thức thanh toán</h2>
                <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
                  <Radio value="cod">
                    <img src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg" alt="COD" />
                    <span>Thanh toán khi giao hàng (COD)</span>
                  </Radio>
                  <Radio value="bank">
                    <img src="https://hstatic.net/0/0/global/design/seller/image/payment/other.svg" alt="Bank" />
                    <span>Chuyển khoản qua ngân hàng</span>
                  </Radio>
                </Radio.Group>

                {paymentMethod === 'bank' && (
                  <div className="bank-info">
                    <p>Thông tin tài khoản:</p>
                    <p>Ngân hàng: BIDV</p>
                    <p>Số tài khoản: 4681729121</p>
                    <p>Chủ tài khoản: VU HUY ANH</p>
                  </div>
                )}
              </div>

              <div className="step-footer">
                <button 
                  type="submit" 
                  className="btn-checkout" 
                  disabled={loading}
                >
                  {loading ? 'Đang xử lý...' : 'Hoàn tất đơn hàng'}
                </button>
                <Link to="/cart" className="step-footer-previous-link">
                  Giỏ hàng
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;