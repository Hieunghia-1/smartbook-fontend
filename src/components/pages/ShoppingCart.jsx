import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SearchProvider } from '../context/SearchContext';
import { saveOrder } from '../api/orderApi'
import { formatCurrency } from '../../ultils';

import Header from '../Header';
import Footer from '../Footer';
import Image from './Image';

import '../../resources/css/shoppingCart.css';

function ShoppingCart() {

    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuth();

    // Load cart items from sessionStorage on component mount
    useEffect(() => {
        const loadCart = () => {
            try {
                const cartData = sessionStorage.getItem('cart');

                // Handle cases where cart doesn't exist or is invalid
                if (!cartData || cartData === 'undefined') {
                    sessionStorage.removeItem('cart');
                    setCartItems([]);
                    return;
                }

                const parsedCart = JSON.parse(cartData);

                // Verify we got an array
                if (Array.isArray(parsedCart)) {
                    setCartItems(parsedCart);
                } else {
                    console.warn('Invalid cart data, resetting...');
                    sessionStorage.removeItem('cart');
                    setCartItems([]);
                }
            } catch (error) {
                console.error('Error loading cart:', error);
                sessionStorage.removeItem('cart');
                setCartItems([]);
            }
        };

        loadCart();
    }, []);

    // Update quantity of a cart item
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCart = cartItems.map(item =>
            item._id === productId ? { ...item, quantity: newQuantity } : item
        );

        setCartItems(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Remove item from cart
    const removeItem = (productId) => {
        const updatedCart = cartItems.filter(item => item._id !== productId);
        setCartItems(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Calculate total price for each item
    const calculateItemTotal = (price, quantity) => {
        return formatCurrency(price * quantity);
    };

    // Calculate grand total
    const calculateGrandTotal = () => {
        return formatCurrency(cartItems.reduce(
            (total, item) => total + (item.price * item.quantity),
            0
        ));
    };

    // Handle payment
    const handlePayment = async () => {
        // In a real app, you would process payment here
        let total = calculateGrandTotal();
        let payment = 'Cash on Delivery';
        let items = cartItems.map((product) => ({
            product: product._id,
            quantity: product.quantity,
            price: product.price
        }));
        let userId = user.id;
        await saveOrder(items, userId, payment);
        alert(`Payment processed! Total: ${total} VND`);
        sessionStorage.removeItem('cart');
        navigate('/'); // Redirect to home after payment
    };
    return (
        <SearchProvider>
            <div className='container root'>
                <Header />
                <div className="shopping-cart">
                    <h1>Giỏ hàng của bạn</h1>

                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <p>Your cart is empty</p>
                            <button onClick={() => navigate('/')}>Continue Shopping</button>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {cartItems.map(item => (
                                    <div key={item._id} className="cart-item">
                                        <div className="item-image">
                                            <Image bookId={item.imageUrl} name={item.name} />
                                        </div>
                                        <div className="item-details">
                                            <h3>{item.name}</h3>
                                            <p>Giá: {formatCurrency(item.price)}</p>
                                            <div className="quantity-control">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                                                    +
                                                </button>
                                            </div>
                                            <p>Tổng: {calculateItemTotal(item.price, item.quantity)}</p>
                                            <button
                                                className="remove-btn"
                                                onClick={() => removeItem(item._id)}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-summary">
                                <h2>Tổng kết đơn hàng</h2>
                                <div className="summary-row">
                                    <span>Tổng cộng:</span>
                                    <span>{calculateGrandTotal()}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Phí giao hàng:</span>
                                    <span>Miễn phí</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Tổng thành tiền:</span>
                                    <span>{calculateGrandTotal()}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Phương thức thanh toán:</span>
                                    <span>Thanh toán khi nhận hàng</span>
                                </div>
                                <button
                                    className="checkout-btn"
                                    onClick={handlePayment}
                                >
                                    Tiến hành thanh toán
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <Footer />
            </div>
        </SearchProvider>
    )
}

export default ShoppingCart;