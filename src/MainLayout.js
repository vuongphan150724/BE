// MainLayout.js
import React from 'react';
import Menu from './Menu';
import SanPhamXemNhieu from './SanPhamXemNhieu';
import './MainLayout.css';

const MainLayout = ({ children, sotin }) => {
  return (
    <div className="container">
      <nav>
        <Menu />
      </nav>

      <main className="d-flex">
        <article className="col-md-9">
          {children}
        </article>
        <aside className="col-md-3">
          <SanPhamXemNhieu sotin={sotin} />
        </aside>
      </main>

      <footer>
        <p>Phan Minh Vương</p>
      </footer>
    </div>
  );
};

export default MainLayout;
