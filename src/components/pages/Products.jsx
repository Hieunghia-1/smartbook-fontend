// pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { Button, Badge } from 'react-bootstrap';
import DataTable from '../dashboard/DataTable';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        // Mock data
        // const mockProducts = [
        //   {
        //     id: 1,
        //     name: 'Premium Laptop',
        //     category: 'Electronics',
        //     price: 1299.99,
        //     stock: 15,
        //     status: 'In Stock'
        //   },
        //   {
        //     id: 2,
        //     name: 'Wireless Headphones',
        //     category: 'Audio',
        //     price: 199.99,
        //     stock: 0,
        //     status: 'Out of Stock'         
        //   },
        //   // Add more mock products...
        //   ...Array.from({ length: 8 }, (_, i) => ({
        //     id: i + 3,
        //     name: `Product ${i + 3}`,
        //     category: ['Electronics', 'Clothing', 'Home'][Math.floor(Math.random() * 3)],
        //     price: parseFloat((Math.random() * 500 + 10).toFixed(2)),
        //     stock: Math.floor(Math.random() * 50),
        //     status: Math.random() > 0.3 ? 'In Stock' : 'Out of Stock'
        //   }))
        // ];
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:3001/api/manage/books');
        const products = response.data.map((product, index) => ({
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

  const handleEdit = (product) => {
    console.log('Edit product:', product);
    // Open modal or navigate to edit page
  };

  const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      setProducts(products.filter((p) => p.id !== product.id));
    }
  };

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Product Name' },
    { key: 'category', title: 'Category' },
    { 
      key: 'price', 
      title: 'Price',
      render: (value) => `$${value.toFixed(2)}`
    },
    { 
      key: 'stock', 
      title: 'Stock',
      render: (value) => <span className={value === 0 ? 'text-danger' : ''}>{value}</span>
    },
    { 
      key: 'status', 
      title: 'Status',
      render: (value) => (
        <Badge bg={value === 'In Stock' ? 'success' : 'danger'}>
          {value}
        </Badge>
      )
    },
    { key: 'imageUrl', title: 'Image URL' },
  ];

  return (
    <div className="container-fluid pt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Product Management</h2>
        <Button variant="primary" onClick={() => console.log('Add new product')}>
          <i className="bi bi-plus-lg me-2"></i>
          Add Product
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
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Products;