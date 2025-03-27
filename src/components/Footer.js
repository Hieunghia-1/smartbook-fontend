import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faTwitter,
    faInstagram,
    faYoutube
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    {/* <!-- Column 1: Giới thiệu --> */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h5>BookWorld</h5>
                        <p>BookWorld là thiên đường dành cho những người yêu sách. Chúng tôi cung cấp hàng ngàn đầu sách chất lượng với nhiều thể loại đa dạng.</p>
                        <div className="social-icons mt-3">
                            <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
                            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                            <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
                        </div>
                    </div>

                    {/* <!-- Column 2: Danh mục sách --> */}
                    <div className="col-lg-2 col-md-6 mb-4">
                        <h5>Danh mục</h5>
                        <div className="footer-links">
                            <a href="#">Văn học</a>
                            <a href="#">Khoa học</a>
                            <a href="#">Kinh tế</a>
                            <a href="#">Tâm lý học</a>
                            <a href="#">Thiếu nhi</a>
                            <a href="#">Sách ngoại ngữ</a>
                        </div>
                    </div>

                    {/* <!-- Column 3: Liên kết hữu ích --> */}
                    <div className="col-lg-2 col-md-6 mb-4">
                        <h5>Liên kết</h5>
                        <div className="footer-links">
                            <a href="#">Trang chủ</a>
                            <a href="#">Giới thiệu</a>
                            <a href="#">Sách mới</a>
                            <a href="#">Sách bán chạy</a>
                            <a href="#">Khuyến mãi</a>
                            <a href="#">Liên hệ</a>
                        </div>
                    </div>

                    {/* <!-- Column 4: Newsletter --> */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h5>Liên hệ</h5>
                        <p><i className="fas fa-map-marker-alt me-2"></i> 123 Đường Sách, Q.1, TP.HCM</p>
                        <p><i className="fas fa-phone me-2"></i> (028) 1234 5678</p>
                        <p><i className="fas fa-envelope me-2"></i> info@bookworld.com</p>
                    </div>
                </div>
            </div>

            {/* <!-- Copyright --> */}
            <div className="copyright text-center">
                <div className="container">
                    <p className="mb-0">&copy; 2023 SmartBook. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;