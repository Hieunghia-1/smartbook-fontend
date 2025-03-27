import React from 'react';

const Body = () => {
    return (
        <div className="d-flex">
            <div className="sidebar bg-white">
                <div className="sidebar-header">
                    <h4 className="mb-0">Danh mục sách</h4>
                    <small className="text-muted">Chọn loại sách bạn quan tâm</small>
                </div>

                <div className="category-title mt-3">Sách Văn học</div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item book-item d-flex justify-content-between align-items-center">
                        Tiểu thuyết
                        <span className="badge bg-primary rounded-pill">128</span>
                    </li>
                    <li className="list-group-item book-item d-flex justify-content-between align-items-center">
                        Truyện ngắn
                        <span className="badge bg-primary rounded-pill">75</span>
                    </li>
                    <li className="list-group-item book-item d-flex justify-content-between align-items-center">
                        Thơ
                        <span className="badge bg-primary rounded-pill">42</span>
                    </li>
                    <li className="list-group-item book-item d-flex justify-content-between align-items-center">
                        Kịch bản
                        <span className="badge bg-primary rounded-pill">19</span>
                    </li>
                </ul>

                <div className="category-title mt-3">Sách Khoa học</div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item book-item d-flex justify-content-between align-items-center">
                        Khoa học tự nhiên
                        <span className="badge bg-success rounded-pill">56</span>
                    </li>
                    <li className="list-group-item book-item d-flex justify-content-between align-items-center">
                        Công nghệ thông tin
                        <span className="badge bg-success rounded-pill">89</span>
                    </li>
                    <li className="list-group-item book-item d-flex justify-content-between align-items-center">
                        Y học
                        <span className="badge bg-success rounded-pill">34</span>
                    </li>
                    <li className="list-group-item book-item d-flex justify-content-between align-items-center">
                        Vũ trụ học
                        <span className="badge bg-success rounded-pill">27</span>
                    </li>
                </ul>


                <div className="category-title mt-3">Sách Kinh tế</div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item book-item d-flex justify-content-between align-items-center">
                        Quản trị kinh doanh
                        <span className="badge bg-warning rounded-pill">64</span>
                    </li>
                    <li className="list-group-item book-item d-flex justify-content-between align-items-center">
                        Đầu tư tài chính
                        <span className="badge bg-warning rounded-pill">47</span>
                    </li>
                    <li className="list-group-item book-item d-flex justify-content-between align-items-center">
                        Marketing
                        <span className="badge bg-warning rounded-pill">52</span>
                    </li>
                    <li className="list-group-item book-item d-flex justify-content-between align-items-center">
                        Khởi nghiệp
                        <span className="badge bg-warning rounded-pill">38</span>
                    </li>
                </ul>
            </div>

            <div className="flex-grow-1 p-4">
                <h2>Nội dung chính</h2>
                <p>Chọn một danh mục sách từ menu bên trái để xem chi tiết.</p>
                <div className="alert alert-info">
                    <strong>Gợi ý:</strong> Menu này có thể dễ dàng tích hợp với JavaScript để hiển thị nội dung tương ứng khi người dùng nhấp vào.
                </div>
            </div>
        </div>
    )
}

export default Body;