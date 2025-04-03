import React, { useState, useEffect } from 'react';
import '../../resources/css/sidebar.css';

const BookCard = ({ bookId, book, onAddToCart }) => {
    const [imageSrc, setImageSrc] = useState('');

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
            <button onClick={() => onAddToCart(book)}>Add to Cart</button>
        </div>
    );
};

export default BookCard;