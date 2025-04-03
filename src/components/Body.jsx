import React, { useState, useEffect } from 'react';
import Sidebar from './dashboard/DashboardSidebar';
import BookCard from './dashboard/BookCard';
import '../resources/css/sidebar.css';
import {
    getProducts,
} from './api/productsApi'

const Body = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Simulate API call
        const fetchProducts = async () => {
          try {
            const list = await getProducts();                    
            setBooks(list);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };

        fetchProducts();
      }, []);

    const categories = ['All', ...new Set(books.map(book => book.category))];
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [cart, setCart] = useState([]);

    const filteredBooks = selectedCategory === 'All'
        ? books
        : books.filter(book => book.category === selectedCategory);

    const addToCart = (book) => {
        setCart([...cart, book]);
        alert(`${book.name} added to cart!`);
    };

    return (
        <div className="d-flex">

            <Sidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />
            <div className="flex-grow-1 p-4">
                <h2>Nội dung chính</h2>
                <p>Chọn một danh mục sách từ menu bên trái để xem chi tiết.</p>
                <div className="alert alert-info">
                    <div className="main-content">
                        <h2>{selectedCategory} Books</h2>
                        <div className="books-grid">
                            {filteredBooks.map(book => (
                                <BookCard
                                    key={book.id}
                                    bookId={book.imageUrl}
                                    book={book}
                                    onAddToCart={addToCart}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Body;