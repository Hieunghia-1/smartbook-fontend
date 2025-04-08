import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import Dashboard from './components/Dashboard';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import ManagePage from './components/pages/ManagePage';
import Users from './components/pages/Users';
import Products from './components/pages/Products';
import ShoppingCart from './components/pages/ShoppingCart';
import Orders from './components/pages/Orders';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './resources/css/nav.css'


function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/order" element={<ShoppingCart />} />

            <Route path="/manage" element={<ProtectedRoute><ManagePage /></ProtectedRoute>}>
              <Route index element={<div>Dashboard Content</div>} />
              <Route path="users" element={<Users />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
            </Route>

            <Route path="/" element={<Navigate to="/manage" replace />} />
            <Route path="*" element={<Navigate to="/manage" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
