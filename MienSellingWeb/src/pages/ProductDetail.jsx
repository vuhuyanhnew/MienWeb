import React, { useState, useEffect } from 'react';
import { Button, InputNumber, message } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';
import './ProductDetail.css';
import productImage from '../img/Product_img_1.png';
import useCart from '../hooks/useCart';
import { useParams, useLocation, useNavigate} from 'react-router-dom';

function ProductDetail() {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  useEffect(() => {
    if (location.state && location.state.product) {
      setProduct(location.state.product);
    } else {
      navigate('/product');
    }
  }, [id, location.state]);

  const handleAddToCart = () => {
    try {
      if (!product) return;
      
      const productToAdd = {
        ...product,
        quantity: quantity  
      };
      
      addToCart(productToAdd);
      message.success("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      message.error("Có lỗi xảy ra khi thêm vào giỏ hàng!");
    }
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  // Hiển thị loading nếu chưa có dữ liệu sản phẩm
  if (!product) {
    return <div className="loading">Đang tải thông tin sản phẩm...</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-wrapper">
        <div className="product-image">
          <div className="image-wrapper">
            <img src={product.image} alt={product.name} />
            <button className="zoom-button">
              <ZoomInOutlined />
            </button>
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>

          <div className="product-price">
            <span className="price">{product.price.toLocaleString()}VNĐ</span>
            <span className="shipping">+ Free Shipping</span>
          </div>

          <div className="product-description">
            {product.description ? (
              <p>{product.description}</p>
            ) : (
              <p>Chưa có mô tả cho sản phẩm này.</p>
            )}
          </div>
          
          <div className="product-specifications">
            <p><strong>Khối lượng</strong>: {product.id === 1 ? '250g' : '500g'}</p>
            <p><strong>Hạn sử dụng</strong>: 1 năm từ ngày sản xuất</p>
            <p><strong>Bảo quản</strong>: Nơi khô ráo, thoáng mát</p>
            <p><strong>Cách dùng</strong>: Ngâm 5-10 phút, nấu 1-2 phút hoặc xào 3-5 phút</p>
          </div>

          <div className="product-actions">
            <InputNumber 
              min={1} 
              value={quantity}
              onChange={handleQuantityChange}
            />
            <Button 
              type="primary" 
              className="add-to-cart-btn" 
              onClick={handleAddToCart}
            >
              THÊM VÀO GIỎ HÀNG
            </Button>
          </div>

          <div className="product-meta">
            <div className="categories">
              Danh mục: <span>{product.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      {/* <div className="product-tabs">
        <div className="tabs-header">
          <button className="tab active">Mô tả</button>
          <button className="tab">Đánh giá (0)</button>
        </div>
        <div className="tab-content">
          <p>{product.description || "Chưa có mô tả chi tiết cho sản phẩm này."}</p>
        </div>
      </div> */}
    </div>
  );
}

export default ProductDetail;