import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import emailjs from '@emailjs/browser';
import { 
  EnvironmentOutlined, 
  PhoneOutlined,
  CalendarOutlined,
  MailOutlined, 
  FacebookOutlined
} from '@ant-design/icons';
import './Contact.css';
import { Link } from 'react-router-dom';


const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const templateParams = {
        from_name: values.name,
        from_email: values.email,
        phone: values.phone,
        message: values.message,
        to_name: 'Admin', 
        reply_to: values.email,
      };

      // Gửi email sử dụng EmailJS
      const result = await emailjs.send(
        'service_02uqgtt', // Service ID 
        'template_02tvpjr', //Template ID 
        templateParams,
        'qU5zkPePsoW6ItOV8' // Public Key
      );

      if (result.status === 200) {
        message.success('Gửi tin nhắn thành công!');
        form.resetFields();
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <h2>Thông tin liên hệ</h2>

        <div className="info-table">
          <div className="info-row">
            <div className="info-cell">
              <div className="info-cell-content">
                <EnvironmentOutlined className="info-icon" />
                <div className="info-text">
                  <h3>Địa chỉ</h3>
                  <p>Cụm 4 thôn 3, xã Thạch Hoà, huyện Thạch Thất, Hà Nội</p>
                </div>
              </div>
            </div>
            <div className="info-cell">
              <div className="info-cell-content">
                <Link to="https://www.facebook.com/haidang.fnad" 
                style={{ textDecoration: "none", color: "inherit" }}>
                <FacebookOutlined className="info-icon" />
                <div className="info-text">
                </div>
                <div>Mien Muong Phang</div>
                </Link>
              </div>
            </div>
          </div>

          <div className="info-row">
            <div className="info-cell">
              <div className="info-cell-content">
                <PhoneOutlined className="info-icon" />
                <div className="info-text">
                  <h3>Điện thoại</h3>
                  <p>0385030402</p>
                </div>
              </div>
            </div>
            <div className="info-cell">
              <div className="info-cell-content">
                <MailOutlined className="info-icon" />
                <div className="info-text">
                  <h3>Email</h3>
                  <p>vuhuyanhnew@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>Gửi thắc mắc cho chúng tôi</h2>
            <p>Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể.</p>
            
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="contact-form"
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
              >
                <Input placeholder="Tên của bạn" />
              </Form.Item>

              <div className="form-row">
                <Form.Item
                  name="email"
                  className="form-col"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không hợp lệ!' }
                  ]}
                >
                  <Input placeholder="Email của bạn" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  className="form-col"
                  rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại!' },
                    { pattern: /^[0-9]{10,12}$/, message: 'Số điện thoại không hợp lệ!' }
                  ]}
                >
                  <Input placeholder="Số điện thoại của bạn" />
                </Form.Item>
              </div>

              <Form.Item
                name="message"
                rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
              >
                <TextArea rows={4} placeholder="Nội dung" />
              </Form.Item>

              <div className="recaptcha-notice">
                <p>
                  This site is protected by reCAPTCHA and the Google{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
                    Terms of Service
                  </a>{' '}
                  apply.
                </p>
              </div>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  className="submit-button"
                  loading={loading}
                >
                  Gửi cho chúng tôi
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;