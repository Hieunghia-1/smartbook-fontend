import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/admin/books/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => console.log(error));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
}

export default ProductDetail;