// pages/Users.jsx
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from '../dashboard/DataTable';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchUsers = async () => {
      try {
        // Mock data
        const mockUsers = Array.from({ length: 45 }, (_, i) => ({
          id: i + 1,
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          role: i % 3 === 0 ? 'Admin' : i % 2 === 0 ? 'Editor' : 'Viewer',
          status: i % 4 === 0 ? 'Inactive' : 'Active',
          lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        }));
        
        setUsers(mockUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    console.log('Edit user:', user);
    // Open modal or navigate to edit page
  };

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      setUsers(users.filter((u) => u.id !== user.id));
    }
  };

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { 
      key: 'role', 
      title: 'Role',
      render: (value) => (
        <span className={`badge ${
          value === 'Admin' ? 'bg-purple' :
          value === 'Editor' ? 'bg-primary' : 'bg-success'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'status', 
      title: 'Status',
      render: (value) => (
        <span className={`badge ${value === 'Active' ? 'bg-success' : 'bg-danger'}`}>
          {value}
        </span>
      )
    },
    { key: 'lastLogin', title: 'Last Login' },
  ];

  return (
    <div className="container-fluid pt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Management</h2>
        <Button variant="primary">
          Add New User
        </Button>
      </div>
      
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <DataTable
          data={users}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Users;