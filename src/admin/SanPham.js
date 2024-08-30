import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SanPham.css';

function SanPham() {
  const { id } = useParams();
  const [sanPham, setSanPham] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/admin/sp/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.thongbao) {
          setError(data.thongbao);
        } else {
          setSanPham(data);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setError('Error fetching product details');
      });
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="san-pham-container">
      {sanPham ? (
        <div className="san-pham-details">
          <img src={sanPham.hinh} alt={sanPham.ten_sp} className="san-pham-img" />
          <h2>{sanPham.ten_sp}</h2>
          <p><strong>Giá:</strong> {sanPham.gia.toLocaleString()} VNĐ</p>
          <p><strong>Ngày:</strong> {new Date(sanPham.ngay).toLocaleDateString()}</p>
          <p><strong>Lượt xem:</strong> {sanPham.luot_xem}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SanPham;
