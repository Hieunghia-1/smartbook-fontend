
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';

const DeleteConfirmationModal = ({
  show,
  handleClose,
  user,
  handleDelete
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    try {
      await handleDelete(user);
      handleClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận xóa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn có chắc chắn muốn xóa không? <strong>{user?.name}</strong>?
        Hành động này không thể hoàn tác.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
          Hủy bỏ
        </Button>
        <Button variant="danger" onClick={onDelete} disabled={isLoading}>
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;