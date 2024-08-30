import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./menu.css";

const Menu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [listloai, setListloai] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

    // Fetch listloai từ API
    fetch('http://localhost:3000/loai-san-pham-count')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data from API:', data); // Kiểm tra dữ liệu
        setListloai(data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <nav>
      <ul className="nav-menu">
        <li><Link to="/">Trang chủ</Link></li>
        <li><Link to="/gioithieu">Giới thiệu</Link></li>
        <li><Link to="/timkiem">Tìm kiếm</Link></li>
        <li><Link to="/showcart">Giỏ hàng</Link></li>
        <li><Link to="/donhang">Hóa đơn</Link></li>
        <li className="dropdown">
          <span className="dropbtn">Danh mục sản phẩm</span>
          <ul className="dropdown-content">
            {Array.isArray(listloai) && listloai.length > 0 ? (
              listloai.map((loai, i) => (
                <li key={i}>
                  <Link to={`/loai/${loai.id_loai}`}>{loai.ten_loai}</Link>
                </li>
              ))
            ) : (
              <li>Không có loại sản phẩm nào</li>
            )}
          </ul>
        </li>
        {!isLoggedIn && <li><Link to="/login">Đăng nhập</Link></li>}
        <li><Link to="/account">Tài khoản</Link></li>
        {isLoggedIn && <li><Link to="/admin">Quản trị</Link></li>} {/* Thêm nút quản trị */}
      </ul>
    </nav>
  );
}

export default Menu;
