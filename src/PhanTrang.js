import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { themSP } from "./cartSlice";
import ReactPaginate from "react-paginate";
import "./phantrang.css";

function PhanTrang({ listSP, pageSize }) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);

  // Kiểm tra nếu listSP không phải là mảng hoặc là mảng rỗng
  if (!Array.isArray(listSP) || listSP.length === 0) {
    return <p className="no-results">Không có sản phẩm nào.</p>;
  }

  const pageCount = Math.ceil(listSP.length / pageSize);
  const fromIndex = currentPage * pageSize;
  const toIndex = Math.min(fromIndex + pageSize, listSP.length);
  const spTrongTrang = listSP.slice(fromIndex, toIndex);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const addToCart = (sp) => {
    dispatch(themSP(sp)); // Dispatch action to add item to cart
    console.log("Đã thêm sản phẩm vào giỏ hàng:", sp);
  };

  return (
    <div>
      <div className="phantrang">
        {spTrongTrang.map((sp, index) => (
          <div className="sp" key={index}>
            <h4>
              <Link to={`/sp/${sp.id}`}>{sp.ten_sp}</Link>
            </h4>
            <img src={sp.hinh} alt={sp.ten_sp} />
            <button className="add-to-cart-button" onClick={() => addToCart(sp)}>Thêm vào giỏ hàng</button>
          </div>
        ))}
      </div>
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
        />
      )}
    </div>
  );
}

export default PhanTrang;
