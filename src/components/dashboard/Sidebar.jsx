import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    HouseDoor,
    People,
    Box,
    Gear,
    BoxArrowRight,
    ArrowLeftCircle,
} from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ sidebarOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    const navItems = [
        { name: 'Dashboard', icon: HouseDoor, path: '/manage' },
        { name: 'Users', icon: People, path: '/manage/users' },
        { name: 'Products', icon: Box, path: '/manage/products' },
        { name: 'Settings', icon: Gear, path: '/manage/settings' },
    ];

    return (
        <div
            className={`bg-dark text-white d-flex flex-column flex-shrink-0 p-3 sidebar ${sidebarOpen ? 'open' : 'closed'}`}
            style={{ width: sidebarOpen ? '280px' : '80px', transition: 'width 0.3s' }}
        >
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                {sidebarOpen ? (
                    <span className="fs-4">Admin Panel</span>
                ) : (
                    <span className="fs-4">AP</span>
                )}
            </div>
            <hr />
            <Nav variant="pills" className="flex-column mb-auto">
                {navItems.map((item) => (
                    <Nav.Item key={item.name}>
                        <Nav.Link
                            onClick={() => navigate(item.path)}
                            active={location.pathname === item.path}
                            className="text-white d-flex align-items-center"
                        >
                            <item.icon className="me-3" size={20} />
                            {sidebarOpen && item.name}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
            <hr />
            <Nav.Item>
                <Nav.Link
                    onClick={() => navigate('/')}
                    className="text-white d-flex align-items-center"
                >
                    <ArrowLeftCircle className="me-3" size={20} />
                    {sidebarOpen && 'Back to Home'}
                </Nav.Link>
                <Nav.Link
                    onClick={logout}
                    className="text-white d-flex align-items-center"
                >
                    <BoxArrowRight className="me-3" size={20} />
                    {sidebarOpen && 'Logout'}
                </Nav.Link>
            </Nav.Item>
        </div>
    );
};

export default Sidebar;