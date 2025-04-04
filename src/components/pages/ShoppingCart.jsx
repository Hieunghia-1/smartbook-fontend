import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../resources/css/shoppingCart.css';

import Header from '../Header';
import Footer from '../Footer';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Image from './Image';
import { saveOrder } from '../api/orderApi'

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
        return (price * quantity);
    };

    // Calculate grand total
    const calculateGrandTotal = () => {
        return cartItems.reduce(
            (total, item) => total + (item.price * item.quantity),
            0
        );
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
        <AuthProvider>
            <div className='container root'>
                <Header />
                <div className="shopping-cart">
                    <h1>Your Shopping Cart</h1>

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
                                            <p>Price: {item.price} VND</p>
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
                                            <p>Total: {calculateItemTotal(item.price, item.quantity)} VND</p>
                                            <button
                                                className="remove-btn"
                                                onClick={() => removeItem(item._id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-summary">
                                <h2>Order Summary</h2>
                                <div className="summary-row">
                                    <span>Subtotal:</span>
                                    <span>{calculateGrandTotal()} VND</span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping:</span>
                                    <span>Free</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total:</span>
                                    <span>{calculateGrandTotal()} VND</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Payment:</span>
                                    <span>Cash on Delivery</span>
                                </div>
                                <button
                                    className="checkout-btn"
                                    onClick={handlePayment}
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <Footer />
            </div>

        </AuthProvider>
    )
}

export default ShoppingCart;