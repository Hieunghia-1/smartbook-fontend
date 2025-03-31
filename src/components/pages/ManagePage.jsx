// pages/ManagePage.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../dashboard/Sidebar';
import Navbar from '../dashboard/Navbar';

const ManagePage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            {/* Sidebar - using Bootstrap classes with custom styling */}
            <Sidebar sidebarOpen={sidebarOpen} />

            {/* Main content area */}
            <div
                className="flex-grow-1"
                style={{
                    marginLeft: sidebarOpen ? '280px' : '80px',
                    transition: 'margin 0.3s'
                }}
            >
                {/* Navbar */}
                <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* Main content container */}
                <main className="p-4 bg-light" style={{ minHeight: 'calc(100vh - 56px)' }}>
                    <div className="container-fluid">
                        <Outlet /> {/* This renders nested routes (Users, Products, etc.) */}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ManagePage;