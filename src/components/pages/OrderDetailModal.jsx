import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const OrderDetailModal = ({ show, handleClose, order, handleStatusUpdate }) => {
  const [status, setStatus] = useState(order?.status || '');

  const handleSave = () => {
    handleStatusUpdate(order._id, status);
    handleClose();
  };

  if (!order) return null;

  const total = order.orderDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết đơn hàng #{order.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Số điện thoại:</strong> {order.customer.phone}</p>
        <p><strong>Email:</strong> {order.customer.email}</p>
        <p><strong>Ngày tạo:</strong> {new Date(order.createdAt).toLocaleString()}</p>

        <h5>Sản phẩm:</h5>
        <ul>
          {order.orderDetails.map((item, idx) => (
            <li key={idx}>
              {item.product.name} - SL: {item.quantity} - Giá: {item.price.toLocaleString()}đ
            </li>
          ))}
        </ul>
        <p><strong>Tổng tiền:</strong> {total.toLocaleString()}đ</p>

        <Form.Group className="mt-3">
          <Form.Label>Trạng thái đơn hàng</Form.Label>
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Chờ xác nhận</option>
            <option>Đang giao</option>
            <option>Đã giao</option>
            <option>Đã hủy</option>
          </Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Cập nhật trạng thái
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailModal;
