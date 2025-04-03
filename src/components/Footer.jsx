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
                  
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h5>SmartBook</h5>
                        <p>SmartBook là thiên đường dành cho những người yêu sách. Chúng tôi cung cấp hàng ngàn đầu sách chất lượng với nhiều thể loại đa dạng.</p>
                        <div className="social-icons mt-3">
                            <a href="/"><FontAwesomeIcon icon={faFacebookF} /></a>
                            <a href="/"><FontAwesomeIcon icon={faTwitter} /></a>
                            <a href="/"><FontAwesomeIcon icon={faInstagram} /></a>
                            <a href="/"><FontAwesomeIcon icon={faYoutube} /></a>
                        </div>
                    </div>

                   
                    <div className="col-lg-2 col-md-6 mb-4">
                        <h5>Danh mục</h5>
                        <div className="footer-links">
                            <a href="/">Thiếu Nhi</a>
                            <a href="/">Kinh tế</a>
                            <a href="/">Ngôn tình</a>
                            <a href="/">Kỹ năng</a>
                            <a href="/">Giáo Khoa</a>
                            
                        </div>
                    </div>

                    
                    <div className="col-lg-2 col-md-6 mb-4">
                        <h5>Liên kết</h5>
                        <div className="footer-links">
                            <a href="/">Trang chủ</a>
                            <a href="/">Giới thiệu</a>
                            <a href="/">Sách mới</a>
                            <a href="/">Sách bán chạy</a>
                            <a href="/">Khuyến mãi</a>
                            
                        </div>
                    </div>

                    
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h5>Liên hệ</h5>
                        <p><i className="fas fa-map-marker-alt me-2"></i>123 Đường Sách Văn Hóa, Phường Bình An, Quận Ánh Dương, Thành phố Sách Xanh</p>
                        <p><i className="fas fa-phone me-2"></i> (028) 1234 5678</p>
                        <p><i className="fas fa-envelope me-2"></i> info@SmartBook.com</p>
                    </div>
                </div>
            </div>

            
            <div className="copyright text-center">
                <div className="container">
                    <p className="mb-0">&copy; 2025 SmartBook. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;