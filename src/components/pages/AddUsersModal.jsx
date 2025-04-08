// components/AddUserModal.jsx
import { useState } from 'react';
import { Modal, Button, Form, FloatingLabel, Alert } from 'react-bootstrap';

const AddUserModal = ({
    show,
    handleClose,
    handleAdd
}) => {
    const [newUser, setNewUser] = useState({
        fullname: '',
        username: '',
        password: '',
        email: '',
        phone: ''
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' || name === 'rating'
                ? parseFloat(value)
                : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Validate required fields
            if (!newUser.username || !newUser.password) {
                throw new Error('Username and Password are required');
            }
            if (!newUser.email) {
                throw new Error('Email are required');
            }

            await handleAdd(newUser);
            handleClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm mới người dùng</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <FloatingLabel controlId="fullname" label="Họ và tên" className="mb-3">
                        <Form.Control
                            type="text"
                            name="fullname"
                            value={newUser.fullname}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="username" label="Tên đăng nhập" className="mb-3">
                        <Form.Control
                            type="text"
                            name="username"
                            value={newUser.username}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="email" label="Email" className="mb-3">
                        <Form.Control
                            type="text"
                            name="email"                           
                            value={newUser.email}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="phone" label="Số điện thoại" className="mb-3">
                        <Form.Control
                            type="text"
                            name="phone"                            
                            value={newUser.phone}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="password" label="Mật khẩu" className="mb-3">
                        <Form.Control
                            type="password"
                            name="password"                    
                            value={newUser.password}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>                    
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
                        Hủy
                    </Button>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Adding...' : 'Add User'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddUserModal;