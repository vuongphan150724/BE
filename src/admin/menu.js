import React from 'react';
import { Link } from 'react-router-dom';


function Menu({ isSidebarOpen }) {
  return (
    <div id="mySidenav" className={`sidenav ${isSidebarOpen ? 'open' : 'closed'}`}>
      <p className="logo"><span>M</span>-SoftTech</p>
     
      <Link to="/admin" className="icon-a"><i className="fa fa-product-hunt icons"></i> Products</Link>
      <Link to="/loai" className="icon-a"><i className="fa fa-th-list icons"></i> Categories</Link>
    </div>
  );
}

export default Menu;
