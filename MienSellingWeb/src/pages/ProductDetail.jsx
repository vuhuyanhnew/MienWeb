import React, { useState } from 'react';
import { Button, Rate, InputNumber } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';
import './ProductDetail.css';
import productImage from '../img/Product_img_1.png';
import useCart from '../hooks/useCart';

function ProductDetail() {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Định nghĩa thông tin sản phẩm cố định
  const product = {
    id: "mien-muong-phang-01", // ID duy nhất cho sản phẩm
    name: "Mien Muong Phang",
    price: 100000,
    image: productImage,
    variant: "Default",
    slug: "mien-muong-phang"
  };

  const handleAddToCart = () => {
    try {
      const productToAdd = {
        ...product,
        quantity: quantity  
      };
      
      addToCart(productToAdd);
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Có lỗi xảy ra khi thêm vào giỏ hàng!");
    }
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-wrapper">
        <div className="product-image">
          <div className="image-wrapper">
            <img src={productImage} alt={product.name} />
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
            <p>
              Neque porro quisquam est, qui dolore ipsum quia dolor sit amet, 
              consectetur adipisci velit, sed quia non incidunt lores ta porro ame. 
              numquam eius modi tempora incidunt lores ta porro ame.
            </p>
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
              ADD TO CART
            </Button>
          </div>

          <div className="product-meta">
            <div className="categories">
              Categories: <a href="/groceries">Groceries</a>, <a href="/juice">Food</a>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="product-tabs">
        <div className="tabs-header">
          <button className="tab active">Description</button>
          <button className="tab">Reviews (0)</button>
        </div>
        <div className="tab-content">
          <p>
            Neque porro quisquam est, qui dolore ipsum quia dolor sit amet, 
            consectetur adipisci velit, sed quia non incidunt lores ta porro ame. 
            numquam eius modi tempora incidunt lores ta porro ame.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;