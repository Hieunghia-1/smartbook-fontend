import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faLock, 
  faIdCard,
  faPhone,
  faCircleNotch
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Họ tên là bắt buộc';
    if (!formData.email) newErrors.email = 'Email là bắt buộc';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email không hợp lệ';
    if (!formData.phone) newErrors.phone = 'Số điện thoại là bắt buộc';
    else if (!/^\d{10,11}$/.test(formData.phone)) newErrors.phone = 'Số điện thoại không hợp lệ';
    if (!formData.password) newErrors.password = 'Mật khẩu là bắt buộc';
    else if (formData.password.length < 6) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Mật khẩu không khớp';

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

  // Submit register form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError('');

    try {
      // Gọi API đăng ký
      const response = await axios.post('https://api.yourdomain.com/auth/register', {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        password_confirmation: formData.confirmPassword
      });

      // Xử lý kết quả thành công
      const { message } = response.data;
      
      // Hiển thị thông báo và chuyển hướng
      alert(message || 'Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản');
      navigate('/login'); // Chuyển về trang login sau khi đăng ký
      
    } catch (error) {
      // Xử lý lỗi từ API
      if (error.response) {
        // Lỗi từ phía server (4xx, 5xx)
        const { data } = error.response;
        
        if (data.errors) {
          // Lỗi validation từ server
          const serverErrors = {};
          Object.keys(data.errors).forEach(key => {
            serverErrors[key] = data.errors[key][0]; // Lấy message lỗi đầu tiên
          });
          setErrors(serverErrors);
        } else {
          setApiError(data.message || 'Đăng ký thất bại. Vui lòng thử lại');
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
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">ĐĂNG KÝ TÀI KHOẢN</h2>
                <p className="text-muted">Tạo tài khoản để bắt đầu trải nghiệm</p>
              </div>

              {/* Hiển thị lỗi API */}
              {apiError && (
                <div className="alert alert-danger" role="alert">
                  {apiError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Họ và tên */}
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Họ và tên</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="text"
                      className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Nhập họ tên đầy đủ"
                      disabled={isSubmitting}
                    />
                    {errors.fullName && (
                      <div className="invalid-feedback">{errors.fullName}</div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faEnvelope} />
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

                {/* Số điện thoại */}
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Số điện thoại</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faPhone} />
                    </span>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại"
                      disabled={isSubmitting}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>
                </div>

                {/* Mật khẩu */}
                <div className="mb-3">
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
                      placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                      disabled={isSubmitting}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                </div>

                {/* Xác nhận mật khẩu */}
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                      type="password"
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Nhập lại mật khẩu"
                      disabled={isSubmitting}
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}
                  </div>
                </div>

                {/* Điều khoản dịch vụ */}
                <div className="mb-4 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreeTerms"
                    required
                    disabled={isSubmitting}
                  />
                  <label className="form-check-label" htmlFor="agreeTerms">
                    Tôi đồng ý với <a href="/terms" target="_blank" rel="noopener noreferrer">Điều khoản dịch vụ</a> và <a href="/privacy" target="_blank" rel="noopener noreferrer">Chính sách bảo mật</a>
                  </label>
                </div>

                {/* Nút đăng ký */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mb-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon icon={faCircleNotch} spin className="me-2" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faIdCard} className="me-2" />
                      ĐĂNG KÝ
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-muted mb-0">Đã có tài khoản? <a href="/login" className="text-decoration-none">Đăng nhập ngay</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;