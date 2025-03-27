import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faSignInAlt, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email là bắt buộc';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email không hợp lệ';
    if (!formData.password) newErrors.password = 'Mật khẩu là bắt buộc';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when typing
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (apiError) setApiError('');
  };

  // Submit login form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError('');

    try {
      // Gọi API login
      const response = await axios.post('https://api.yourdomain.com/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // Xử lý kết quả thành công
      const { token, user } = response.data;
      
      // Lưu token vào localStorage hoặc cookie
      localStorage.setItem('authToken', token);
      
      // Chuyển hướng đến trang dashboard
      navigate('/dashboard');
      
    } catch (error) {
      // Xử lý lỗi từ API
      if (error.response) {
        // Lỗi từ phía server (4xx, 5xx)
        switch (error.response.status) {
          case 401:
            setApiError('Email hoặc mật khẩu không đúng');
            break;
          case 429:
            setApiError('Bạn đã đăng nhập quá nhiều lần. Vui lòng thử lại sau 5 phút');
            break;
          default:
            setApiError('Đã xảy ra lỗi. Vui lòng thử lại sau');
        }
      } else if (error.request) {
        // Không nhận được phản hồi từ server
        setApiError('Không thể kết nối đến máy chủ');
      } else {
        // Lỗi khác
        setApiError('Lỗi hệ thống: ' + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid vh-100 bg-light">
      <div className="root row justify-content-center align-items-center h-100">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h3 className="fw-bold text-primary">ĐĂNG NHẬP HỆ THỐNG</h3>
                <p className="text-muted">Vui lòng nhập thông tin tài khoản</p>
              </div>

              {/* Hiển thị lỗi API */}
              {apiError && (
                <div className="alert alert-danger" role="alert">
                  {apiError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Nhập email"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Mật khẩu</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu"
                      disabled={isSubmitting}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="remember"
                      disabled={isSubmitting}
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Ghi nhớ đăng nhập
                    </label>
                  </div>
                  <a href="/forgot-password" className="text-decoration-none">
                    Quên mật khẩu?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon icon={faCircleNotch} spin className="me-2" />
                      Đang đăng nhập...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                      Đăng nhập
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="text-muted">Chưa có tài khoản? <a href="/register" className="text-decoration-none">Đăng ký ngay</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;