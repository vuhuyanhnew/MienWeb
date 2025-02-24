import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AppLayout.css';
import { Button } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import payment1Img from '../../img/payment_1_img.png';
import payment2Img from '../../img/payment_2_img.png';
import shipment1Img from '../../img/shipment_1_img.png';
import shipment2Img from '../../img/shipment_2_img.png';
import logo from '../../img/test_logo.png';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faInstagram, 
  faYoutube, 
  faTiktok, 
  faTwitter 
} from '@fortawesome/free-brands-svg-icons';
const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <div className="layout">
<header className="main-header">
  <div className="logo">
    <Link to="/home">
      <img src={logo} alt="Mien" />
    </Link>
  </div>

  <button className="mobile-menu-btn" onClick={toggleMenu}>
    {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
  </button>    

  <nav className={`main-nav mobile-nav ${isMenuOpen ? 'show' : ''}`}>
    <ul>
      <li><Link to="/home" onClick={toggleMenu}>Trang chủ</Link></li>
      <li><Link to="/product" onClick={toggleMenu}>Sản phẩm</Link></li>
      <li><Link to="/contact" onClick={toggleMenu}>Liên hệ</Link></li>
    </ul>
  </nav>

  {isMenuOpen && <div className="mobile-menu-overlay" onClick={toggleMenu} />}
  
  <div className="header-actions">
    <Link to="/search"><Button shape="circle" icon={<SearchOutlined />} style={{display:'none'}}></Button></Link>
    <Link to="/account" className="account-button" style={{display:'none'}}><Button icon={<UserOutlined />}/></Link>
    <Link to="/cart" className="cart-button"><Button icon={<ShoppingCartOutlined/> }></Button></Link>
  </div>
</header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/home">
              <img src={logo} alt="Mien" className="footer-logo" />
            </Link>
            <h3 className="footer-title">
              Một sản phẩm sạch được làm ra cho tất cả mọi người
            </h3>
            <p className="footer-description">
            Giữa bạt ngàn núi non Tây Bắc, Mường Phăng là mảnh đất màu mỡ với khí hậu trong lành, nơi cả dòng phát triển tự nhiên, không chịu tác động từ hóa chất hay can thiệp công nghiệp. Cây dong Mường Phăng mọc lên từ những vùng đất sạch và được nuôi dưỡng từ nguồn nước mát lành của núi rừng. Bởi vậy, mỗi sợi miến dong Mường Phăng không chỉ là một thực phẩm mà còn là một món quà từ thiên nhiên, chứa đựng tinh hoa đất trời, hoàn toàn phù hợp cho những ai hướng tới lối sống lành mạnh và chế độ ăn sạch
            </p>
          </div>

          <div className="footer-social">
          <a href="/" aria-label="Facebook">
          <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="/" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="/" aria-label="YouTube">
          <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="/" aria-label="TikTok">
          <FontAwesomeIcon icon={faTiktok} />
          </a>
          <a href="/" aria-label="Twitter">
          <FontAwesomeIcon icon={faTwitter} />
          </a>
          </div>
          {/* <div className="footer-links">
            <Link to="/sales-policy">Chính sách bán hàng</Link>
            <Link to="/return-policy">Chính sách đổi trả</Link>
            <Link to="/privacy-policy">Chính sách bảo mật</Link>
          </div> */}

          <div className="footer-payment">
            <h4>Phương thức thanh toán</h4>
            <div className="payment-methods">
            <img src={payment1Img} alt="ZaloPay" />
            <img  src={payment2Img} alt="VNPay" />
              
            </div>
          </div>

          <div className="footer-shipping">
            <h4>Phương thức vận chuyển</h4>
            <div className="shipping-methods">
              <img src={shipment1Img} alt="GHN" />
              <img src={shipment2Img} alt="J&T" />
            </div>
          </div>

          
        </div>
      </footer>
    </div>
  );
};

export default Layout;