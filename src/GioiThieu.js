import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { themSP } from "./cartSlice";

function GioiThieu() {
  const [listsp, setListSP] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:3000/SPNoibat/9")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setListSP(data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddToCart = (sp) => {
    // Dispatch action to add product to cart
    dispatch(themSP(sp));
    console.log(`Đã thêm sản phẩm vào giỏ hàng: ${sp.ten_sp}`);
  };

  return (
    <div className="home">
     
      {listsp.slice(0, 6).map((sp, i) => (
        <div className="sp" key={i}>
          <h4>
            <Link to={`/sp/${sp.id}`}>{sp.ten_sp}</Link>
          </h4>
          <img src={sp.hinh} alt={sp.ten_sp} />
          <p>Giá: {Number(sp.gia).toLocaleString("vi")} VNĐ</p>
          <button className="add-to-cart-button" onClick={() => handleAddToCart(sp)}>Thêm vào giỏ hàng</button>
        </div>
      ))}
    </div>
  );
}

export default GioiThieu;
