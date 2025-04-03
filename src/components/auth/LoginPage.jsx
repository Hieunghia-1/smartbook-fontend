import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faLock,
  faSignInAlt,
  faCircleNotch,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../context/AuthContext';
import { loginAPI } from '../api/authApi';

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Tên đăng nhập là bắt buộc';
    if (!formData.password) newErrors.password = 'Mật khẩu là bắt buộc';
    else if (formData.password.length < 6) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';

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
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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
      const params = {
        username: formData.username,
        password: formData.password
      }
      const { token, user } = await loginAPI(params);

      if (!user || !user.role) {
        throw new Error('Thông tin người dùng không hợp lệ');
      }

      // Lưu thông tin đăng nhập
      login(token, {
        id: user.id,
        name: user.name || formData.username,
        email: user.email || formData.username,
        role: user.role
      });

      // Chuyển hướng sẽ được xử lý trong useEffect khi isAuthenticated thay đổi

    } catch (error) {
      console.error('Login error:', error);

      let errorMessage = 'Đã xảy ra lỗi. Vui lòng thử lại sau';

      if (error.response) {
        // Lỗi từ phía server (4xx, 5xx)
        switch (error.response.status) {
          case 400:
            errorMessage = 'Dữ liệu không hợp lệ';
            break;
          case 401:
            errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng';
            break;
          case 403:
            errorMessage = 'Tài khoản của bạn không có quyền truy cập';
            break;
          case 429:
            errorMessage = 'Bạn đã đăng nhập quá nhiều lần. Vui lòng thử lại sau 5 phút';
            break;
          case 500:
            errorMessage = 'Lỗi máy chủ. Vui lòng thử lại sau';
            break;
          default:
            errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (error.request) {
        // Không nhận được phản hồi từ server
        errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng';
      } else if (error.message) {
        // Lỗi khác
        errorMessage = error.message;
      }

      setApiError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid vh-100 bg-light">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-8 col-lg-6 col-xl-4">
          <div className="card shadow-sm">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <h3 className="fw-bold text-primary">ĐĂNG NHẬP HỆ THỐNG</h3>
                <p className="text-muted">Vui lòng nhập thông tin tài khoản</p>
              </div>

              {/* Hiển thị lỗi API */}
              {apiError && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
                  <div>{apiError}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Username Field */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Tên đăng nhập</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="text"
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Nhập tên đăng nhập"
                      disabled={isSubmitting}
                      autoComplete="username"
                      autoFocus
                    />
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Mật khẩu</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu"
                      disabled={isSubmitting}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting}
                    >
                      <FontAwesomeIcon icon={showPassword ? faLock : faUser} />
                    </button>
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
                  <Link to="/forgot-password" className="text-decoration-none">
                    Quên mật khẩu?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mb-3"
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

                <div className="text-center">
                  <p className="text-muted mb-0">Chưa có tài khoản?</p>
                  <Link to="/register" className="text-decoration-none">
                    Đăng ký tài khoản mới
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;