import React, { useState } from 'react';
import axios from 'axios';


const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

//   const history = useHistory();

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/api/manage/books/search?q=${encodeURIComponent(e.target.value)}`);
        setSuggestions(response.data); // Giả sử API trả về danh sách sách
      } catch (error) {
        console.error('Error fetching books:', error);
      }
      setLoading(false);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectBook = (bookId) => {
    // history.push(`/book/${bookId}`); // Chuyển đến trang chi tiết sách
  };

  return (
    <div className="form-control input-sm me-2" aria-label="Search">
      <input 
        className="search-input"
        type="search"
        placeholder="Tìm kiếm sách..."
        value={query}
        onChange={handleSearch}
      />
      {loading && <p>Đang tải...</p>}
      <ul>
        {suggestions.map((book) => (
          <li key={book.id} onClick={() => handleSelectBook(book.id)}>
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookSearch;
