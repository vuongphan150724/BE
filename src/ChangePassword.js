import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './ChangePassword.css';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token'); 

    try {
        const response = await fetch('http://localhost:3000/change-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ oldPassword, newPassword })
        });
        const result = await response.json();
        
        if (response.ok) {
            setMessage('Mật khẩu đã được đổi thành công!');
            navigate('/account'); 
        } else {
            setMessage(result.thongbao || 'Có lỗi xảy ra');
        }
    } catch (error) {
        console.error('Lỗi khi gửi dữ liệu:', error);
        setMessage('Có lỗi xảy ra khi gửi dữ liệu');
    }
};


  return (
    <div className="change-password-container">
      <h2>Đổi Mật Khẩu</h2>
      <form onSubmit={handleSubmit} className="change-password-form">
        <label>
          Mật Khẩu Cũ:
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Mật Khẩu Mới:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Đổi Mật Khẩu</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ChangePassword;
