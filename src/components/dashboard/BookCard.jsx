import React, { useState, useEffect } from 'react';
import '../../resources/css/sidebar.css';
import { useAuth } from '../context/AuthContext'

const BookCard = ({ bookId, book, onAddToCart }) => {
    const [imageSrc, setImageSrc] = useState('');
    const { isAuthenticated } = useAuth();
    

    useEffect(() => {
        // Dynamic import
        import(`../../resources/img/${bookId}.jpg`)
            .then(image => setImageSrc(image.default))
            .catch(() => setImageSrc('../../resources/img/logo.png'));
    }, [bookId]);

    return (
        <div className="book-card">
            <img src={imageSrc} alt={book.name} />
            <h3>{book.name}</h3>
            <p>{book.price} VND</p>
            { isAuthenticated && <button onClick={() => onAddToCart(book)}>Add to Cart</button> }            
        </div>
    );
};

export default BookCard;