import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoaiSanPhamEdit() {
    const { id } = useParams(); // Lấy ID từ URL
    const [loaiSanPham, setLoaiSanPham] = useState({ ten_loai: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoaiSanPham = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/loai/${id}`);
                setLoaiSanPham(response.data);
            } catch (error) {
                setError('Lỗi khi lấy loại sản phẩm.');
                console.error('Lỗi khi lấy loại sản phẩm:', error);
            }
        };

        fetchLoaiSanPham();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3000/loai/${id}`, { ten_loai: loaiSanPham.ten_loai });
            navigate('/loai'); // Quay lại trang danh sách loại sản phẩm sau khi cập nhật
        } catch (error) {
            setError('Lỗi khi cập nhật loại sản phẩm.');
            console.error('Lỗi khi cập nhật loại sản phẩm:', error);
        }
    };

    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            <h2>Sửa loại sản phẩm</h2>
            <input
                type="text"
                value={loaiSanPham.ten_loai}
                onChange={(e) => setLoaiSanPham({ ...loaiSanPham, ten_loai: e.target.value })}
            />
            <button onClick={handleUpdate}>Cập nhật</button>
        </div>
    );
}

export default LoaiSanPhamEdit;
