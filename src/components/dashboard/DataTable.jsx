import React, { useState } from 'react';
import { Table, Pagination, Button } from 'react-bootstrap';

const DataTable = ({ data, columns, onEdit, onDelete, hiddenFields = ['_id'], showActions = true }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter columns to exclude hidden fields
  const visibleColumns = columns.filter(
    column => !hiddenFields.includes(column.key)
  );

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead className="table-dark">
              <tr>
                {visibleColumns.map((column) => (
                  <th key={column.key}>{column.title}</th>
                ))}
                {showActions && (<th>Hành động</th>)}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, rowIndex) => {
                const rowId = row._id || row.id || rowIndex;
                return (
                  <tr key={rowId}>
                    {visibleColumns.map((column) => (
                      <td key={column.key}>
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                      </td>
                    ))}
                    {showActions && (
                    <td>                      
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => onEdit(row)}
                        className="me-2"
                      >
                        Cập nhật
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => onDelete(row)}
                      >
                        Xóa
                      </Button>
                    </td>)}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} entries
          </div>
          <Pagination>
            <Pagination.First
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            />

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = currentPage <= 3
                ? i + 1
                : currentPage >= totalPages - 2
                  ? totalPages - 4 + i
                  : currentPage - 2 + i;
              return page > 0 && page <= totalPages ? (
                <Pagination.Item
                  key={page}
                  active={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Pagination.Item>
              ) : null;
            })}

            <Pagination.Next
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default DataTable;