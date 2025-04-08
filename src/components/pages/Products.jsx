// pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { Button, Badge, Alert } from 'react-bootstrap';
import DataTable from '../dashboard/DataTable';
import EditProductModal from './EditProductModal';
import AddProductModal from './AddProductModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from '../api/productsApi';
import { formatCurrency } from '../../ultils';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        const list = await getProducts();        
        const products = list.map((product, index) => ({
          ...product,
          id: index + 1,
          status: product.stock > 0 ? 'In Stock' : 'Out of Stock'
        }));
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add Product
  const handleAdd = async (product) => {
    try {
      const newProduct = await addProduct(product);
      setProducts([...products, newProduct]);
      showAlert('Product added successfully!', 'success');
    } catch (error) {
      showAlert('Failed to add product', 'danger');
      throw error;
    }
  };

  // Edit Product
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  // Delete Product
  const handleDeleteClick = (product) => {
    setCurrentProduct(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async (product) => {
    try {
      await deleteProduct(product._id);
      setProducts(products.filter(p => p._id !== product._id));
      showAlert('Product deleted successfully!', 'success');
    } catch (error) {
      showAlert('Failed to delete product', 'danger');
    }
  };

  const handleSave = async (updatedProduct) => {
    try {
      const response = await updateProduct(updatedProduct._id, updatedProduct);
      setProducts(products.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
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
    { key: '_id' },
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Tên sản phẩm' },
    { key: 'category', title: 'Thể loại' },
    {
      key: 'price',
      title: 'Giá',
      render: (value) => formatCurrency(value)
    },
    {
      key: 'stock',
      title: 'Số lượng tồn kho',
      render: (value) => <span className={value === 0 ? 'text-danger' : ''}>{value}</span>
    },
    {
      key: 'status',
      title: 'Trạng thái',
      render: (value) => (
        <Badge bg={value === 'In Stock' ? 'success' : 'danger'}>
          {value}
        </Badge>
      )
    },
    { key: 'imageUrl', title: 'URL' },
  ];

  return (
    <div className="container-fluid pt-4">
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
          {alert.message}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý sản phẩm</h2>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <i className="bi bi-plus-lg me-2"></i>
          Thêm sản phẩm
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
          data={products}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Modals */}
      <AddProductModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleAdd={handleAdd}
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        product={currentProduct}
        handleDelete={handleDeleteConfirm}
      />

      <EditProductModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        product={currentProduct}
        handleSave={handleSave}
      />
    </div>
  );
};

export default Products;