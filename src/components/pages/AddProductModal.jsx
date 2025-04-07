// components/AddProductModal.jsx
import { useState } from 'react';
import { Modal, Button, Form, FloatingLabel, Alert } from 'react-bootstrap';

const AddProductModal = ({
    show,
    handleClose,
    handleAdd
}) => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: '',
        price: 0,
        stock: 0,
        imgUrl: '',
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
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
            if (!newProduct.name || !newProduct.category) {
                throw new Error('Name and category are required');
            }

            await handleAdd(newProduct);
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
                <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <FloatingLabel controlId="name" label="Product Name" className="mb-3">
                        <Form.Control
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>

                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name="category"
                            value={newProduct.category || ''}
                            onChange={handleChange}
                        >
                            <option value=""></option>
                            <option value="Sách trẻ em">Sách trẻ em</option>
                            <option value="Sách kinh tế">Sách kinh tế</option>
                            <option value="Truyện ngôn tình">Truyện ngôn tình</option>
                            <option value="Sách kỹ năng">Sách kỹ năng</option>
                            <option value="Sách giáo khoa">Sách giáo khoa</option>
                        </Form.Select>
                    </Form.Group>

                    <FloatingLabel controlId="price" label="Price" className="mb-3">
                        <Form.Control
                            type="number"
                            name="price"
                            step="1000"
                            min="0"
                            value={newProduct.price}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="stock" label="Stock Quantity" className="mb-3">
                        <Form.Control
                            type="number"
                            name="stock"
                            min="0"
                            value={newProduct.stock}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="imageUrl" label="Image" className="mb-3">
                        <Form.Control
                            type="text"
                            name="imageUrl"                            
                            value={newProduct.imageUrl}
                            onChange={handleChange}
                            required
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Adding...' : 'Add Product'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddProductModal;