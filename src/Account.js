import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css';

const Account = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData && userData !== "undefined" && userData !== "null") {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    const handleChangePassword = () => {
        navigate('/change-password'); 
    };

    return (
        <div className="account-container">
            {user ? (
                <div>
                    <h1>Thông tin tài khoản</h1>
                    <p>Tên: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Số điện thoại: {user.dien_thoai}</p>
                    {/* Hiển thị thêm các thông tin khác của người dùng nếu có */}
                    <button onClick={handleLogout}>Đăng xuất</button>
                    <button onClick={handleChangePassword}>Đổi Mật Khẩu</button>
                </div>
            ) : (
                <p>Vui lòng đăng nhập để xem thông tin tài khoản</p>
            )}
        </div>
    );
};

export default Account;
