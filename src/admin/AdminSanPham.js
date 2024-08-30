import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import Menu from './menu';
import Header from './header';
import ReactPaginate from 'react-paginate';
import './AdminSanPham.css';

function AdminSanPham() {
  const [sanPhamList, setSanPhamList] = useState([]);
  const [loaiSanPhamList, setLoaiSanPhamList] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4; 
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/admin/sp')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setSanPhamList(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setError('Error fetching products');
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/loai-san-pham-count') // Đổi endpoint nếu cần
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setLoaiSanPhamList(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setError('Error fetching categories');
      });
  }, []);

  useEffect(() => {
    $(".nav").click(function(){
      $("#mySidenav").css('width','70px');
      $("#main").css('margin-left','70px');
      $(".logo").css('visibility', 'hidden');
      $(".logo span").css('visibility', 'visible');
      $(".logo span").css('margin-left', '-10px');
      $(".icon-a").css('visibility', 'hidden');
      $(".icons").css('visibility', 'visible');
      $(".icons").css('margin-left', '-8px');
      $(".nav").css('display','none');
      $(".nav2").css('display','block');
    });

    $(".nav2").click(function(){
      $("#mySidenav").css('width','300px');
      $("#main").css('margin-left','300px');
      $(".logo").css('visibility', 'visible');
      $(".icon-a").css('visibility', 'visible');
      $(".icons").css('visibility', 'visible');
      $(".nav").css('display','block');
      $(".nav2").css('display','none');
    });
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/admin/sp/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.thongbao === 'Đã xóa sp') {
          setSanPhamList(sanPhamList.filter(sp => sp.id !== id));
        } else {
          setError('Error deleting product');
        }
      })
      .catch((error) => {
        console.error('Delete error:', error);
        setError('Error deleting product');
      });
  };

  const handleEdit = (id) => {
    navigate(`/admin/sp/edit/${id}`);
  };

  const handleAdd = () => {
    navigate('/admin/sp/add');
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  
  const pageCount = Math.ceil(sanPhamList.length / pageSize);
  const fromIndex = currentPage * pageSize;
  const toIndex = Math.min(fromIndex + pageSize, sanPhamList.length);
  const spTrongTrang = sanPhamList.slice(fromIndex, toIndex);

  return (
    <div
      style={{
        margin: '0px',
        padding: '0px',
        backgroundColor: '#1b203d',
        fontFamily: 'system-ui',
      }}
    >
      <nav>
        <Menu />
      </nav>

      <div id="main">
        <nav>
          <Header />
        </nav>

        <div className="col-div-8">
          <div className="box-8">
            <div className="content-box">
              <p>
                Danh sách sản phẩm
                <span>
                  <button className="add-button" onClick={handleAdd}>
                    Thêm Sản Phẩm
                  </button>
                </span>
              </p>
              <br />

              <table>
                <thead>
                  <tr>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Hình</th>
                    <th>Ngày</th>
                    <th>Lượt xem</th>
                    <th>Danh mục</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {spTrongTrang.map((sp) => (
                    <tr key={sp.id}>
                      <td>{sp.ten_sp}</td>
                      <td>{sp.gia.toLocaleString()} VNĐ</td>
                      <td>
                        <img src={sp.hinh} alt={sp.ten_sp} className="san-pham-img" />
                      </td>
                      <td>{new Date(sp.ngay).toLocaleDateString()}</td>
                      <td>{sp.luot_xem}</td>
                      <td>{sp.ten_loai}</td>
                      <td>
                        <button
                          className="action-button"
                          onClick={() => handleEdit(sp.id)}
                        >
                          Sửa
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(sp.id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {pageCount > 1 && (
                <ReactPaginate
                  previousLabel={"Trước"}
                  nextLabel={"Tiếp"}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              )}
            </div>
          </div>
        </div>

        <div className="col-div-4">
          <div className="box-4">
            <div className="content-box">
              <p>Danh sách loại sản phẩm</p>
              <div className="content-box">
                <br />
                <table>
                  <thead>
                    <tr>
                      <th>Tên loại</th>
                      <th>Số lượng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loaiSanPhamList.map((loai) => (
                      <tr key={loai.ten_loai}>
                        <td>{loai.ten_loai}</td>
                        <td>{loai.so_luong_san_pham}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>
      </div>
    </div>
  );
}

export default AdminSanPham;
