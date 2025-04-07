import React, { useState } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useSearch } from '../context/SearchContext';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const { performSearch, resetSearch } = useSearch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query);
    }
  };

  const handleReset = () => {
    setQuery('');
    resetSearch();
  };

  const handleChange = (e) => {
    let value = e.target.value;
    if (value.trim().length === 0) {
      handleReset();
    } else {
      setQuery(e.target.value)
    }
  };

  return (
    <Form className="d-flex align-items-center" onSubmit={(e) => {
      handleSearch(e);
    }}>
      <div className="me-2" style={{ flexGrow: 1 }}>
        <FloatingLabel
          controlId="searchInput"
          label="Tìm kiếm sách ... "
          className="mb-0" // Remove default bottom margin
        >
          <Form.Control
            type="text"
            placeholder="Search books"
            style={{ height: '58px' }} // Match button height
            value={query}
            onChange={(e) => handleChange(e)}
          />
        </FloatingLabel>
      </div>

      <Button
        variant="outline-success"
        type="submit"
        style={{ height: '58px' }} // Match input height
      >
        Tìm kiếm
      </Button>
    </Form>
  );
};

export default BookSearch;
