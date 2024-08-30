import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddLoaiSanPham() {
    const [tenLoai, setTenLoai] = useState('');
    const [slug, setSlug] = useState('');
    const [thuTu, setThuTu] = useState(0);
    const [anHien, setAnHien] = useState(0);
    const navigate = useNavigate(); // Hook điều hướng

    const handleSubmit = async (e) => {
        e.preventDefault();

        const generateSlug = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        const slugGenerated = generateSlug(tenLoai);

        try {
            const response = await axios.post('http://localhost:3000/add/loai', {
                ten_loai: tenLoai,
                slug: slugGenerated,
                thu_tu: thuTu,
                an_hien: anHien,
            });
            console.log('Thêm loại sản phẩm thành công:', response.data);
            navigate('/loai'); 
        } catch (error) {
            console.error('Lỗi khi thêm loại sản phẩm:', error);
        }
    };

    return (
        
        <div>
            <h1>Thêm Loại Sản Phẩm</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tên loại:</label>
                    <input
                        type="text"
                        value={tenLoai}
                        onChange={(e) => setTenLoai(e.target.value)} // Cập nhật tên loại sản phẩm
                    />
                </div>
                <div>
                    <label>Slug:</label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)} // Cập nhật slug, nếu cần thiết
                    />
                </div>
                <div>
                    <label>Thứ tự:</label>
                    <input
                        type="number"
                        value={thuTu}
                        onChange={(e) => setThuTu(Number(e.target.value))} // Cập nhật thứ tự
                    />
                </div>
                <div>
                    <label>Ẩn/Hiện:</label>
                    <select
                        value={anHien}
                        onChange={(e) => setAnHien(Number(e.target.value))} // Cập nhật trạng thái ẩn hiện
                    >
                        <option value={0}>Ẩn</option>
                        <option value={1}>Hiện</option>
                    </select>
                </div>
                <button type="submit">Thêm</button>
            </form>
        </div>
    );
}

export default AddLoaiSanPham;
