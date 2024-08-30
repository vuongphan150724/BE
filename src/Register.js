import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dien_thoai, setDienThoai] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, dien_thoai }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage('Đăng ký thành công!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage(data.thongbao || 'Có lỗi xảy ra');
      }
    } catch (error) {
      setMessage('Có lỗi xảy ra khi gửi yêu cầu');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-container__title">Đăng Ký</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="register-form__group">
          <label htmlFor="name" className="register-form__label">Họ và Tên:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="register-form__input"
          />
        </div>
        <div className="register-form__group">
          <label htmlFor="email" className="register-form__label">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="register-form__input"
          />
        </div>
        <div className="register-form__group">
          <label htmlFor="password" className="register-form__label">Mật Khẩu:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-form__input"
          />
        </div>
        <div className="register-form__group">
          <label htmlFor="dien_thoai" className="register-form__label">Số Điện Thoại:</label>
          <input
            type="text"
            id="dien_thoai"
            value={dien_thoai}
            onChange={(e) => setDienThoai(e.target.value)}
            required
            className="register-form__input"
          />
        </div>
        <button type="submit" className="register-form__button">Đăng Ký</button>
        {message && <div className="register-form__message">{message}</div>}
      </form>
    </div>
  );
}

export default Register;
