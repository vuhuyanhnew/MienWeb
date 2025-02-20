import React from 'react';
import { Carousel, Card, Rate } from 'antd';
import banner1 from '../img/EXE_Banner_1.png';
import banner2 from '../img/EXE_Banner_2.png';
import './HomePage.css'; 
import { useNavigate } from 'react-router-dom';

import coffee from '../img/Product_img_1.png';
import sanitizer from  '../img/Product_img_1.png';
import chillies from  '../img/Product_img_1.png';
import oil from  '../img/Product_img_1.png';

function HomePage() {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
      };
      const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
      };
      const navigate = useNavigate();  
  
  const products = [
    {
      id: 1,
      name: "Mien Muong Phang",
      category: "Food",
      price: 300000,
      image: coffee,
      rating: 0
    },
    {
      id: 2,
      name: "Mien Muong Phang",
      category: "Food", 
      price: 300000,
      image: sanitizer,
      rating: 0
    },
    {
      id: 3,
      name: "Mien Muong Phang",
      category: "Food",
      price: 190000,
      image: chillies,
      rating: 0
    },
    {
      id: 4,
      name: "Mien Muong Phang",
      category: "Food",
      price: 300000,
      oldPrice: 34.00,
      image: oil,
      rating: 0,
      sale: true
    }
  ];
 
  return (
    <div>
     <Carousel afterChange={onChange} autoplay>
        <div className="carousel-item">
          <img src={banner1} alt="Banner 1" />
        </div>
        <div className="carousel-item">
          <img src={banner2} alt="Banner 2" />
        </div>
      </Carousel>

      <div className="our-product-section" style={{ padding: '40px 20px' }}>
       
        
        <div className="products-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {products.map(product => (
            <Card 
              key={product.id}
              hoverable
              cover={<img alt={product.name} src={product.image} />}
              style={{ position: 'relative' }}
              onClick={() => handleProductClick(product.id)}
            >
              {/* {product.sale && (
                <span style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: '#90BE6D',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '12px'
                }}>
                  Sale!
                </span>
              )} */}
              <div style={{ textAlign: 'center' }}>
                <p className="text-gray-500 mb-1">{product.category}</p>
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="price mt-2">
                  {/* {product.oldPrice && (
                    <span className="line-through text-gray-400 mr-2">£{product.oldPrice.toFixed(2)}</span>
                  )} */}
                  <span className="font-bold">{product.price}VNĐ</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;