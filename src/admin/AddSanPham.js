import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddSanPham.css'; 

const AddSanPham = () => {
    const [tenSp, setTenSp] = useState('');
    const [gia, setGia] = useState('');
    const [giaKm, setGiaKm] = useState('');
    const [hinh, setHinh] = useState('');
    const [ngay, setNgay] = useState('');
    const [idLoai, setIdLoai] = useState('');
    const [luotXem, setLuotXem] = useState(0); 
    const [anHien, setAnHien] = useState(1); // Default to visible
    const [loaiSanPham, setLoaiSanPham] = useState([]);

    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchLoaiSanPham = async () => {
            try {
                const response = await fetch('http://localhost:3000/loai-san-pham');
                const data = await response.json();
                setLoaiSanPham(data);
            } catch (error) {
                console.error('Lỗi khi lấy loại sản phẩm:', error);
            }
        };
        
        fetchLoaiSanPham();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newProduct = {
            ten_sp: tenSp,
            gia: parseFloat(gia),
            gia_km: parseFloat(giaKm),
            hinh: hinh,
            ngay: ngay,
            id_loai: parseInt(idLoai),
            luot_xem: parseInt(luotXem),
            an_hien: parseInt(anHien)
        };

        try {
            const response = await fetch('http://localhost:3000/admin/sp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
            const result = await response.json();
            
            if (response.ok) {
                alert('Sản phẩm đã được thêm thành công!');
                navigate('/admin'); 
            } else {
                alert(result.thongbao || 'Có lỗi xảy ra');
            }
        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu:', error);
            alert('Có lỗi xảy ra khi gửi dữ liệu');
        }
    };

    return (
        <div className="container">
            <h2>Thêm Sản Phẩm</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="ten_sp">Tên Sản Phẩm:</label>
                    <input
                        type="text"
                        id="ten_sp"
                        value={tenSp}
                        onChange={(e) => setTenSp(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gia">Giá:</label>
                    <input
                        type="number"
                        id="gia"
                        value={gia}
                        onChange={(e) => setGia(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gia_km">Giá Khuyến Mãi:</label>
                    <input
                        type="number"
                        id="gia_km"
                        value={giaKm}
                        onChange={(e) => setGiaKm(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="hinh">Hình Ảnh:</label>
                    <input
                        type="text"
                        id="hinh"
                        value={hinh}
                        onChange={(e) => setHinh(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ngay">Ngày:</label>
                    <input
                        type="date"
                        id="ngay"
                        value={ngay}
                        onChange={(e) => setNgay(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="id_loai">Loại Sản Phẩm:</label>
                    <select
                        id="id_loai"
                        value={idLoai}
                        onChange={(e) => setIdLoai(e.target.value)}
                        required
                    >
                        <option value="">Chọn loại sản phẩm</option>
                        {loaiSanPham.map((loai) => (
                            <option key={loai.id} value={loai.id}>
                                {loai.ten_loai}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="luot_xem">Lượt Xem:</label>
                    <input
                        type="number"
                        id="luot_xem"
                        value={luotXem}
                        onChange={(e) => setLuotXem(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="an_hien">Ẩn/Hiện:</label>
                    <select
                        id="an_hien"
                        value={anHien}
                        onChange={(e) => setAnHien(e.target.value)}
                        required
                    >
                        <option value="1">Hiện</option>
                        <option value="0">Ẩn</option>
                    </select>
                </div>
                <button type="submit">Thêm Sản Phẩm</button>
            </form>
        </div>
    );
};

export default AddSanPham;
