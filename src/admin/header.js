import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Header({ toggleSidebar }) {
  const [userCount, setUserCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [userResponse, categoryResponse, orderResponse, productResponse] = await Promise.all([
          axios.get('http://localhost:3000/count/users'),
          axios.get('http://localhost:3000/count/sp'),
          axios.get('http://localhost:3000/count/orders'),
          axios.get('http://localhost:3000/count/products')
        ]);

        setUserCount(userResponse.data.total);
        setCategoryCount(categoryResponse.data.total);
        setOrderCount(orderResponse.data.total);
        setProductCount(productResponse.data.total);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <div className="head">
        <div className="col-div-6">
          <span 
            style={{ fontSize: '30px', cursor: 'pointer', color: 'white' }} 
            className="nav"
            onClick={toggleSidebar}
          >
            ☰ Dashboard
          </span>
          <span 
            style={{ fontSize: '30px', cursor: 'pointer', color: 'white' }} 
            className="nav2"
            onClick={toggleSidebar}
          >
            ☰ Dashboard
          </span>
        </div>
        <div className="clearfix"></div>
      </div>

      <div className="clearfix"></div>
      <br />

      <div className="col-div-3">
        <div className="box">
          <p>{userCount}<br /><span>user</span></p>
          <i className="fa fa-users box-icon"></i>
        </div>
      </div>
      <div className="col-div-3">
        <div className="box">
          <p>{categoryCount}<br /><span>danh mục</span></p>
          <i className="fa fa-list box-icon"></i>
        </div>
      </div>
      <div className="col-div-3">
        <div className="box">
          <p>{orderCount}<br /><span>đơn hàng</span></p>
          <i className="fa fa-shopping-bag box-icon"></i>
        </div>
      </div>
      <div className="col-div-3">
        <div className="box">
          <p>{productCount}<br /><span>sản phẩm</span></p>
          <i className="fa fa-tasks box-icon"></i>
        </div>
      </div>
      <div className="clearfix"></div>
      <br /><br />
    </>
  );
}

export default Header;
