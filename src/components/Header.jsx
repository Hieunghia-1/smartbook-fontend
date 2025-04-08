import React from 'react';
import logo from '../resources/img/smartbook.png'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import BookSearch from './dashboard/BookSearch';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user, isAdmin } = useAuth();

  return (
    <header>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="logo">
            <a href="/" className="text-decoration-none">
              <img src={logo} alt="Logo" className="img-fluid" />
            </a>
          </div>
          <BookSearch />
          {!isAuthenticated ? (
            <div className='d-flex'>
              <button onClick={() => navigate('/login')} className='btn btn-outline-primary me-2'>Đăng nhập</button>
              <button onClick={() => navigate('/register')} className='btn btn-primary'>Đăng ký</button>
            </div>
          ) : (
            <div>
              <button onClick={logout} className='btn btn-outline-primary me-2'>Đăng xuất</button>
              <button className='btn btn-primary m-2'>Hồ sơ của {user.name}</button>
              <button onClick={() => navigate('/order')} className='btn btn-primary m-2'>Giỏ hàng</button>
              {isAdmin() && <button onClick={() => navigate('/manage')} className='btn btn-danger me-2'>Quản lý</button>}
            </div>
          )}

        </div>
        <hr className='border border-dark' />
      </div>
    </header>
  );
}

export default Header;