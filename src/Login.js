import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const result = await response.json();
            
            if (response.ok) {
                setMessage('Đăng nhập thành công!');
                setSuccess(true);
                if (result.token && result.user) {
                    localStorage.setItem('token', result.token); 
                    localStorage.setItem('user', JSON.stringify(result.user)); 
                }
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                setMessage(result.thongbao || 'Có lỗi xảy ra');
                setSuccess(false);
            }
        } catch (error) {
            setMessage('Có lỗi xảy ra khi gửi yêu cầu');
            setSuccess(false);
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <h1 className="login-container__title">Đăng Nhập</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-form__group">
                    <label htmlFor="email" className="login-form__label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="login-form__input"
                    />
                </div>
                <div className="login-form__group">
                    <label htmlFor="password" className="login-form__label">Mật khẩu:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-form__input"
                    />
                </div>
                <div className="login-form__buttons">
                    <button type="submit" className="login-form__button">Đăng Nhập</button>
                    <button type="button" onClick={handleRegisterRedirect} className="login-form__button">Đăng Ký</button>
                </div>
                {message && (
                    <div className="login-form__message" style={{ color: success ? 'green' : 'red' }}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Login;
