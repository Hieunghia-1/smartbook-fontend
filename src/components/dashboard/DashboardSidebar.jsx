import React from 'react';
import '../../resources/css/sidebar.css';

const Sidebar = ({ categories, selectedCategory, onSelectCategory }) => {

    return (
        <div className="sidebar bg-white">
            <div className="sidebar-header">
                <h4 className="mb-0">Danh mục sách</h4>
                <small className="text-muted">Chọn loại sách bạn quan tâm</small>
            </div>

            <ul>
                {categories.map(category => (
                    <li
                        key={category}
                        className={selectedCategory === category ? 'active' : ''}
                        onClick={() => onSelectCategory(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;