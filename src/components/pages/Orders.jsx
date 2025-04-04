import React, { useEffect, useState } from 'react';
import { Alert, Button, Badge } from 'react-bootstrap';
import { getOrders, updateOrderStatus } from '../api/orderApi';
import DataTable from '../dashboard/DataTable';
import OrderDetailModal from '../pages/OrderDetailModal';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const [loading, setLoading] = useState(true);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      console.log(data);
      setOrders(data);
    } catch (error) {
      setAlert({ show: true, message: 'Lỗi khi tải đơn hàng!', variant: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDetail = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      setAlert({ show: true, message: 'Cập nhật trạng thái thành công!', variant: 'success' });
      fetchOrders();
    } catch (err) {
      setAlert({ show: true, message: 'Không thể cập nhật trạng thái!', variant: 'danger' });
    }
  };

  const columns = [
    { key: '_id' },
    { key: 'name', title: 'Order Name' },
    {
      key: 'customer',
      title: 'Customer',
      render: (customer) => `${customer.email}`
    },
    {
      key: 'createdAt',
      title: 'Date',
      render: (value) => new Date(value).toLocaleString()
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <Badge bg={value === 'Đã giao' ? 'success' : value === 'Đang giao' ? 'warning' : value === 'Đã hủy' ? 'danger' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'totalPrice',
      title: 'Total',
      render: (totalPrice) =>`${totalPrice.toLocaleString()}đ`
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (value, order) => (
        <Button variant="outline-primary" size="sm" onClick={() => handleDetail(order)}>
          Chi tiết
        </Button>
      )
    }
  ];

  return (
    <div className="container-fluid pt-4">
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
          {alert.message}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Order Management</h2>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <DataTable data={orders} columns={columns} showActions={false}/>
      )}

      <OrderDetailModal
        show={showDetailModal}
        handleClose={() => setShowDetailModal(false)}
        order={selectedOrder}
        handleStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default Orders;
