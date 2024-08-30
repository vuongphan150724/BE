import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoaiSanPhamEdit from './LoaiSanPhamEdit';
import Menu from './menu';
import Header from './header';
import ReactPaginate from 'react-paginate';
import AddLoaiSanPham from './AddLoaiSanPham';

function LoaiSanPhamManager() {
    const [loaiSanPham, setLoaiSanPham] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10; // Số loại sản phẩm mỗi trang
    const navigate = useNavigate(); // Hook điều hướng

    useEffect(() => {
        const fetchLoaiSanPham = async () => {
            try {
                const response = await axios.get('http://localhost:3000/loai-san-pham');
                setLoaiSanPham(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy loại sản phẩm:', error);
            }
        };

        fetchLoaiSanPham();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/loai/${id}`);
            setLoaiSanPham(loaiSanPham.filter(item => item.id !== id));
        } catch (error) {
            console.error('Lỗi khi xóa loại sản phẩm:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/loai/edit/${id}`); 
    };

    const handleAddClick = () => {
        navigate('/loai/add'); 
    };

    const pageCount = Math.ceil(loaiSanPham.length / itemsPerPage);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    // Pagination logic
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = loaiSanPham.slice(indexOfFirstItem, indexOfLastItem);

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
                                Danh sách loại sản phẩm
                                <span>
                                    <button className="add-button" onClick={handleAddClick}>
                                        Thêm Loại Sản Phẩm
                                    </button>
                                </span>
                            </p>
                            <br />

                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên loại</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.ten_loai}</td>
                                            <td>
                                                <button
                                                    className="action-button"
                                                    onClick={() => handleEdit(item.id)}
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className="delete-button"
                                                    onClick={() => handleDelete(item.id)}
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
                <div className="clearfix"></div>
            </div>
        </div>
    );
}

export default LoaiSanPhamManager;
