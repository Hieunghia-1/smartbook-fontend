// pages/Users.jsx
import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import DataTable from '../dashboard/DataTable';
import AddUserModal from './AddUsersModal';
import EdituserModal from './EditUsersModal';
import DeleteConfirmationModal from './DeleteUsersModal';
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser
} from '../api/userApi';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Mock data
      const mockUsers = await getUsers();
      const lstUser = mockUsers.map((user, index) => ({
        ...user,
        id: index + 1
      }));
      setUsers(lstUser);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  // Add Product
  const handleAdd = async (user) => {
    try {
      const newUser = await addUser(user);
      setUsers([...users, newUser]);
      showAlert('Product added successfully!', 'success');
    } catch (error) {
      showAlert('Failed to add product', 'danger');
      throw error;
    }
  };

  // Edit Product
  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  // Delete Product
  const handleDeleteClick = (user) => {
    setCurrentUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async (user) => {
    try {
      await deleteUser(user._id);
      setUsers(users.filter(p => p._id !== user._id));
      showAlert('User deleted successfully!', 'success');
    } catch (error) {
      showAlert('Failed to delete product', 'danger');
    }
  };

  const handleSave = async (updatedUser) => {
    try {
      const response = await updateUser(updatedUser._id, updatedUser);
      setUsers(users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      ));
      if (response.status === 200) {
        showAlert('Product updated successfully!', 'success');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
  };

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'username', title: 'Username' },
    { key: 'password', title: 'Password' },
    { key: 'email', title: 'Email' },
    { key: 'phone', title: 'Phone' },
    
  ];

  return (
    <div className="container-fluid pt-4">
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
          {alert.message}
        </Alert>
      )}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Management</h2>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
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
          onDelete={handleDeleteClick}
        />
      )}

      {/* Modals */}
      <AddUserModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleAdd={handleAdd}
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        user={currentUser}
        handleDelete={handleDeleteConfirm}
      />

      <EdituserModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        user={currentUser}
        handleSave={handleSave}
      />
    </div>
  );
};

export default Users;