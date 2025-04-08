
import { useState, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';

const EditProductModal = ({
  show,
  handleClose,
  product,
  handleSave
}) => {
  const [editedProduct, setEditedProduct] = useState(product);

  // Update local state when product prop changes
  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(editedProduct);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered >
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <FloatingLabel controlId="name" label="Tên sản phẩm" className="mb-3">
            <Form.Control
              type="text"
              name="name"
              value={editedProduct?.name || ''}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <Form.Group className="mb-3">
            <Form.Label>Thể loại</Form.Label>
            <Form.Select
              name="category"
              value={editedProduct?.category || ''}
              onChange={handleChange}
            >
              <option value="Sách trẻ em">Sách trẻ em</option>
              <option value="Sách kinh tế">Sách kinh tế</option>
              <option value="Truyện ngôn tình">Truyện ngôn tình</option>
              <option value="Sách kỹ năng">Sách kỹ năng</option>
              <option value="Sách giáo khoa">Sách giáo khoa</option>
            </Form.Select>
          </Form.Group>

          <FloatingLabel controlId="price" label="Giá" className="mb-3">
            <Form.Control
              type="number"
              name="price"
              step="1000"
              min="0"
              value={editedProduct?.price || 0}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="stock" label="Số lượng" className="mb-3">
            <Form.Control
              type="number"
              name="stock"
              min="0"
              value={editedProduct?.stock || 0}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="imageUrl" label="Hình ảnh" className="mb-3">
            <Form.Control
              type="text"
              name="imageUrl"
              value={editedProduct?.imageUrl || ''}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditProductModal;