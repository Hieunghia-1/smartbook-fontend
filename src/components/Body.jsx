import React, { useState, useEffect } from 'react';
import Sidebar from './dashboard/DashboardSidebar';
import BookCard from './dashboard/BookCard';
import '../resources/css/sidebar.css';
import {
    getProducts,
} from './api/productsApi'
import { useSearch } from './context/SearchContext';

const Body = () => {
    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const { isSearch, searchResults } = useSearch();

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

    const productsToDisplay = isSearch ? searchResults : books;

    const categories = ['Tất cả', ...new Set(productsToDisplay.map(book => book.category))];

    const filteredBooks = selectedCategory === 'Tất cả'
        ? productsToDisplay
        : productsToDisplay.filter(book => book.category === selectedCategory);

    const addToCart = (product) => {
        try {
            const cartString = sessionStorage.getItem('cart') || '[]';
            const currentCart = JSON.parse(cartString);

            const existingItem = currentCart.find(item => item._id === product._id);

            const updatedCart = existingItem
                ? currentCart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
                : [...currentCart, { ...product, quantity: 1 }];

            sessionStorage.setItem('cart', JSON.stringify(updatedCart));
            alert(`${product.name} added to cart!`);
        } catch (error) {
            console.error('Error adding to cart:', error);
            sessionStorage.setItem('cart', '[]');
            alert('Could not add item to cart. Please try again.');
        }
    };

    return (
        <div className="d-flex">
            <Sidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />
            <div className="flex-grow-1 p-4">
                {isSearch && <h2>Kết quả tìm kiếm</h2>}
                {!isSearch && <h2>Tất cả</h2>}
                <p>Chọn một danh mục sách từ menu bên trái để xem chi tiết.</p>
                <div className="alert alert-info">
                    <div className="main-content">
                        <h2>{selectedCategory}</h2>
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