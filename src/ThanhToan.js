import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import './ThanhToan.css';
import { Link } from "react-router-dom";

function ThanhToan() {
  const [user, setUser] = useState({
    ho_ten: '',
    email: '',
    sdt: ''
  });

  const htRef = useRef(null);
  const emRef = useRef(null);
  const sdtRef = useRef(null);

  const cart = useSelector(state => state.cart.listSP);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUser({
          ho_ten: user.name || '',
          email: user.email || '',
          sdt: user.dien_thoai || ''
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const submitDuLieu = () => {
    const ht = htRef.current.value;
    const em = emRef.current.value;
    const sdt = sdtRef.current.value;

    if (ht === "" || em === "" || sdt === "") {
      alert('Nhập đủ thông tin bạn ơi');
      return;
    }

    if (cart.length === 0) {
      alert('Bạn chưa chọn sản phẩm nào');
      return;
    }

    const url = "http://localhost:3000/luudonhang";
    const tt = {
      ho_ten: ht,
      email: em,
      sdt: sdt
    };

    const opt = {
      method: "post",
      body: JSON.stringify(tt),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(url, opt)
      .then(res => res.json())
      .then(data => {
        if (data.id_dh < 0) {
          console.log("Lỗi lưu đơn hàng", data);
        } else {
          const id_dh = data.id_dh;
          console.log("Đã lưu xong giỏ hàng");
          luuchitietdonhang(id_dh, cart);
        }
      })
      .catch(error => console.error("Fetch error:", error));
  };

  const luuchitietdonhang = (id_dh, cart) => {
    const url = "http://localhost:3000/luugiohang";

    cart.forEach(sp => {
      const t = { id_dh: id_dh, id_sp: sp.id, so_luong: sp.so_luong };
      const opt = {
        method: "post",
        body: JSON.stringify(t),
        headers: { 'Content-Type': 'application/json' }
      };

      fetch(url, opt)
        .then(res => res.json())
        .then(data => luuxongsp(data))
        .catch(err => console.log('Lỗi lưu sp ', sp, err));
    });
  };

  const luuxongsp = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="input-container">
        <input type="text" ref={htRef} defaultValue={user.ho_ten} placeholder="Họ tên" />
        <input type="text" ref={emRef} defaultValue={user.email} placeholder="Email" />
        <input type="text" ref={sdtRef} defaultValue={user.sdt} placeholder="Số điện thoại" />
      </div>
      <div className="button-container">
        <button onClick={submitDuLieu}><Link to="/donhang">Lưu đơn hàng</Link></button>
      </div>
    </div>
  );
}

export default ThanhToan;
