import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/admin/books')  // Đường dẫn API của backend
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product._id} className="product-item">
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <Link to={`/product/${product._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;