// components/DeleteConfirmationModal.jsx
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';

const DeleteConfirmationModal = ({ 
  show, 
  handleClose, 
  product, 
  handleDelete 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    try {
      await handleDelete(product);
      handleClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete <strong>{product?.name}</strong>? 
        This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onDelete} disabled={isLoading}>
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;