import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { List, Bell, PersonCircle } from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';

const DashboardNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();
  

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container fluid>
        <Button 
          variant="outline-secondary" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="me-2"
        >
          <List />
        </Button>
        <Navbar.Brand href="#">Admin Dashboard</Navbar.Brand>
        
        <div className="d-flex align-items-center ms-auto">
          <Button variant="outline-secondary" className="me-3 position-relative">
            <Bell />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">New alerts</span>
            </span>
          </Button>
          
          <div className="d-flex align-items-center">
            <PersonCircle size={24} className="me-2 text-primary" />
            <span className="d-none d-md-inline">{user?.fullname || 'Admin'}</span>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;