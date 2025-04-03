
import { useState, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';

const EdituserModal = ({
    show,
    handleClose,
    user,
    handleSave,
}) => {
    const [editedUser, setEditedUser] = useState(user);

    // Update local state when user prop changes
    useEffect(() => {
        setEditedUser(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(editedUser);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>                
                    <FloatingLabel controlId="username" label="Username" className="mb-3">
                        <Form.Control
                            type="text"
                            name="username"
                            value={editedUser?.username || ''}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="email" label="Email" className="mb-3">
                        <Form.Control
                            type="text"
                            name="email"
                            value={editedUser?.email || ''}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="phone" label="Phone number" className="mb-3">
                        <Form.Control
                            type="text"
                            name="phone"
                            value={editedUser?.phone || ''}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="password" label="Password" className="mb-3">
                        <Form.Control
                            type="password"
                            name="password"
                            value={editedUser?.password || ''}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EdituserModal;