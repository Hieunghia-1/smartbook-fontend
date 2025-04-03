import React from 'react';
import logo from '../resources/img/logo.png'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="logo">
            <a href="/" className="text-decoration-none">
              <img src={logo} alt="Logo" className="img-fluid" />
            </a>
          </div>
          <form className='d-flex'>
            <input className="form-control input-sm me-2" type="search" placeholder="Nhập nội dung tìm kiếm..." aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Tìm kiếm</button>
          </form>
          {!isAuthenticated ? (
            <div className='d-flex'>
              <button onClick={() => navigate('/login')} className='btn btn-outline-primary me-2'>Đăng nhập</button>
              <button onClick={() => navigate('/register')} className='btn btn-primary'>Đăng ký</button>
            </div>
          ) : (
            <div>
              <button onClick={logout} className='btn btn-outline-primary me-2'>Đăng xuất</button>
              <button className='btn btn-primary m-2'>Hồ sơ của {user.name}</button>
              <button onClick={() => navigate('/manage')} className='btn btn-danger me-2'>Quản lý</button>
              <button className='btn btn-primary m-2'>Giỏ hàng</button>
            </div>
          )}

        </div>
        <hr className='border border-dark' />
      </div>
    </header>
  );
}

export default Header;