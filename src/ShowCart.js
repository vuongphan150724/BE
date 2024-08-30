import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { suaSL, xoaSP, xoaGH } from "./cartSlice";
import "./ShowCart.css";
import { Link, useNavigate } from "react-router-dom";

function ShowCart() {
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = !!localStorage.getItem('token'); // Kiểm tra trạng thái đăng nhập
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.listSP.reduce((total, sp) => total + sp.gia * sp.so_luong, 0);
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/thanhtoan' } });
    } else {
      navigate('/thanhtoan');
    }
  };

  return (
    <div id="giohang">
      <h2>Giỏ hàng của bạn</h2>
      {cart.listSP.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Thành tiền</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {cart.listSP.map((sp, index) => (
                <tr key={index}>
                  <td>
                    <img src={sp.hinh} alt={sp.ten_sp} />
                  </td>
                  <td className="product-name">{sp.ten_sp}</td>
                  <td>
                    <input
                      type="number" min="1"
                      defaultValue={sp.so_luong}
                      onChange={(e) => dispatch(suaSL([sp.id, e.target.value]))}
                    />
                  </td>
                  <td>{Number(sp.gia).toLocaleString("vi")} VNĐ</td>
                  <td>{Number(sp.gia * sp.so_luong).toLocaleString("vi")} VNĐ</td>
                  <td>
                    <a href="#" onClick={() => dispatch(xoaSP(sp.id))}>
                      Xóa
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total">
            Tổng cộng: {Number(calculateTotal()).toLocaleString("vi")} VNĐ
          </div>
          <div className="actions">
            <button className="checkout-button" onClick={handleCheckout}>
              Thanh toán
            </button>
            <button className="clear-cart-button" onClick={() => dispatch(xoaGH())}>
              Xóa giỏ hàng
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShowCart;
