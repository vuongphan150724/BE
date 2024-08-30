import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateSanPham.css';

function UpdateSanPham() {
  const { productId } = useParams();
  const [tenSp, setTenSp] = useState('');
  const [gia, setGia] = useState('');
  const [giaKm, setGiaKm] = useState('');
  const [hinh, setHinh] = useState('');
  const [ngay, setNgay] = useState('');
  const [luotXem, setLuotXem] = useState('');
  const [idLoai, setIdLoai] = useState(''); 
  const [anHien, setAnHien] = useState(1); // Default to visible
  const [loaiList, setLoaiList] = useState([]); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details
    fetch(`http://localhost:3000/admin/sp/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setTenSp(data.ten_sp);
        setGia(data.gia);
        setGiaKm(data.gia_km || '');
        setHinh(data.hinh);
        setNgay(data.ngay ? new Date(data.ngay).toISOString().split('T')[0] : '');
        setLuotXem(data.luot_xem || '');
        setIdLoai(data.id_loai || '');
        setAnHien(data.an_hien || 1); // Default to visible
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('Error fetching product details');
      });

    // Fetch list of product types
    fetch('http://localhost:3000/loai-san-pham')
      .then((res) => res.json())
      .then((data) => {
        setLoaiList(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('Error fetching product types');
      });
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ten_sp: tenSp,
      gia: gia,
      gia_km: giaKm,
      hinh: hinh,
      ngay: ngay,
      luot_xem: luotXem,
      id_loai: idLoai,
      an_hien: anHien, // Include visibility status
    };

    fetch(`http://localhost:3000/admin/sp/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.thongbao);
        if (data.thongbao === 'Đã cập nhật sản phẩm') {
          navigate('/admin');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('Error updating product');
      });
  };

  return (
    <div className="update-san-pham-container">
      <h2>Cập Nhật Sản Phẩm</h2>
      <form onSubmit={handleSubmit} className="update-san-pham-form">
        <label>
          Tên Sản Phẩm:
          <input type="text" value={tenSp} onChange={(e) => setTenSp(e.target.value)} required />
        </label>
        <label>
          Giá:
          <input type="number" value={gia} onChange={(e) => setGia(e.target.value)} required />
        </label>
        <label>
          Giá Khuyến Mãi:
          <input type="number" value={giaKm} onChange={(e) => setGiaKm(e.target.value)} />
        </label>
        <label>
          Hình:
          <input type="text" value={hinh} onChange={(e) => setHinh(e.target.value)} required />
        </label>
        <label>
          Ngày:
          <input type="date" value={ngay} onChange={(e) => setNgay(e.target.value)} required />
        </label>
        <label>
          Lượt Xem:
          <input type="number" value={luotXem} onChange={(e) => setLuotXem(e.target.value)} required />
        </label>
        <label>
          Loại Sản Phẩm:
          <select value={idLoai} onChange={(e) => setIdLoai(e.target.value)} required>
            <option value="">Chọn Loại Sản Phẩm</option>
            {loaiList.map((loai) => (
              <option key={loai.id} value={loai.id}>
                {loai.ten_loai}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ẩn/Hiện:
          <select value={anHien} onChange={(e) => setAnHien(e.target.value)} required>
            <option value="1">Hiện</option>
            <option value="0">Ẩn</option>
          </select>
        </label>
        <button type="submit">Cập Nhật Sản Phẩm</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default UpdateSanPham;
