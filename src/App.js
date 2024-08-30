import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import GioiThieu from "./GioiThieu";
import TimKiem from "./TimKiem";
import ChiTiet from "./ChiTiet";
import SPTrongLoai from "./SPTrongLoai";
import SanPhamXemNhieu from "./SanPhamXemNhieu";
import ShowCart from "./ShowCart";
import ThanhToan from "./ThanhToan";
import DonHang from "./DonHang";
import ChiTietDonHang from "./ChiTietDonHang";
import Account from './Account';
import Login from './Login';
import Register from "./Register";
import SanPham from './admin/SanPham';
import LoaiSanPhamManager from './admin/LoaiSanPhamManager';
import AddLoaiSanPham from './admin/AddLoaiSanPham';
import LoaiSanPhamEdit from './admin/LoaiSanPhamEdit';
import AdminSanPham from './admin/AdminSanPham';
import AddSanPham from './admin/AddSanPham';
import UpdateSanPham from './admin/UpdateSanPham';
import FullscreenLayout from './FullscreenLayout';
import MainLayout from './MainLayout';
import ChangePassword from './ChangePassword';
import Menu from "./Menu";
import "./App.css"; // Chứa CSS chung cho toàn bộ ứng dụng

const sotin = 10;

function App() { 
  return (
    <BrowserRouter>
      <Routes>
        {/* Route toàn màn hình */}
        <Route path="/admin" element={<FullscreenLayout><AdminSanPham /></FullscreenLayout>} />
        <Route path="/admin/sp/add" element={<FullscreenLayout><AddSanPham /></FullscreenLayout>} />
        <Route path="/admin/sp/edit/:productId" element={<FullscreenLayout><UpdateSanPham /></FullscreenLayout>} />
        <Route path="/login" element={<FullscreenLayout><Login /></FullscreenLayout>} />
        <Route path="/register" element={<FullscreenLayout><Register /></FullscreenLayout>} />
        <Route path="/loai" element={<FullscreenLayout><LoaiSanPhamManager /></FullscreenLayout>}/>
        {/* Route với layout chính */}
        <Route path="/" element={<MainLayout sotin={sotin}><Home /></MainLayout>} />
        <Route path="/menu" element={<MainLayout sotin={sotin}><Menu /></MainLayout>} />
        <Route path="/sanpham/:id" element={<MainLayout sotin={sotin}><SanPham /></MainLayout>} />
        <Route path="/change-password" element={<MainLayout sotin={sotin}><ChangePassword  /></MainLayout>}/>
        <Route path="/loai/add" element={<MainLayout sotin={sotin}><AddLoaiSanPham /></MainLayout>} />
        <Route path="/loai/edit/:id" element={<MainLayout sotin={sotin}><LoaiSanPhamEdit /></MainLayout>} />
        <Route path="/gioithieu" element={<MainLayout sotin={sotin}><GioiThieu /></MainLayout>} />
        <Route path="/sp/:id" element={<MainLayout sotin={sotin}><ChiTiet /></MainLayout>} />
        <Route path="/loai/:id_loai" element={<MainLayout sotin={sotin}><SPTrongLoai /></MainLayout>} />
        <Route path="/timkiem" element={<MainLayout sotin={sotin}><TimKiem /></MainLayout>} />
        <Route path="/showcart" element={<MainLayout sotin={sotin}><ShowCart /></MainLayout>} />
        <Route path="/thanhtoan" element={<MainLayout sotin={sotin}><ThanhToan /></MainLayout>} />
        <Route path="/donhang" element={<MainLayout sotin={sotin}><DonHang /></MainLayout>} />
        <Route path="/chitietdonhang/:id_dh" element={<MainLayout sotin={sotin}><ChiTietDonHang /></MainLayout>} />
        <Route path="/account" element={<MainLayout sotin={sotin}><Account /></MainLayout>} />
        <Route path="*" element={<MainLayout sotin={sotin}><NotFound /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
