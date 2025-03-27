import React from 'react';
import logo from '../resources/img/logo.png'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="logo">
            <a href="#" className="text-decoration-none">
              <img src={logo} alt="Logo" className="img-fluid" />
            </a>
          </div>
          <form className='d-flex'>
            <input className="form-control input-sm me-2" type="search" placeholder="Nhập nội dung tìm kiếm..." aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Tìm kiếm</button>
          </form>
          <div className='d-flex'>
            <button onClick={() => navigate('/login')} className='btn btn-outline-primary me-2'>Đăng nhập</button>
            <button onClick={() => navigate('/register')} className='btn btn-primary'>Đăng ký</button>
          </div>
        </div>
        <hr className='border border-dark' />
      </div>
    </header>
  );
}

export default Header;