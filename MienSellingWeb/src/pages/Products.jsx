import React from 'react';
import { Carousel, Card, Rate } from 'antd';
import banner1 from '../img/EXE_Banner_1.png';
import banner2 from '../img/EXE_Banner_2.jpg';
import './HomePage.css'; 
import { useNavigate } from 'react-router-dom';

import coffee from '../img/Product_img_2.png';
import sanitizer from  '../img/Product_img_2.png';


function Product() {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
      };
      const handleProductClick = (product) => {
        navigate(`/product/${product.id}`, { 
            state: { product }
        });
    };
      const navigate = useNavigate();  
  
  const products = [
          {
              id: 1,
              name: "Miến Dong 250g",
              category: "Food",
              price: 35000,
              image: coffee,
              description: "Miến dong 250g được làm từ 100% tinh bột củ dong riềng trồng tự nhiên tại vùng đất màu mỡ Tây Bắc, không hóa chất, không chất bảo quản. Sợi miến dai ngon, không bị nhão, mang đến hương vị chuẩn mực và giàu dinh dưỡng.",
          },
          {
              id: 2,
              name: "Miến Dong 500g",
              category: "Food",
              price: 60000,
              image: sanitizer,
              description: "Miến dong 500g được làm từ 100% tinh bột củ dong riềng trồng tự nhiên tại vùng đất màu mỡ Tây Bắc, không hóa chất, không chất bảo quản. Sợi miến dai ngon, không bị nhão, mang đến hương vị chuẩn mực và giàu dinh dưỡng.",
          },
      ];
 
  return (
    <div className="our-product-section">
                    <h1 className="section-title">Sản phẩm của chúng tôi</h1>
                    
                    <div className="products-grid">
                        {products.map(product => (
                            <Card
                                key={product.id}
                                hoverable
                                cover={<img alt={product.name} src={product.image} />}
                                className="product-card"
                                onClick={() => handleProductClick(product)}
                            >
                                <div className="product-info">
                                    <p className="product-category">{product.category}</p>
                                    <h3 className="product-name">{product.name}</h3>
                                    <div className="product-price">
                                        <span className="price-value">{product.price.toLocaleString()}VNĐ</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>  
  );
}

export default Product;