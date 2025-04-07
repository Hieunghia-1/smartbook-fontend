// SearchContext.js
import { createContext, useState, useContext } from 'react';
import { searchProduct } from '../api/productsApi';

const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [isSearch, setIsSearch] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const performSearch = async (query) => {
        setIsSearch(true);
        setSearchQuery(query);
        // Simulate search - replace with actual API call
        const results = await mockSearch(query);
        setSearchResults(results);
    };

    const resetSearch = () => {
        setIsSearch(false);
        setSearchQuery('');
        setSearchResults([]);
    };

    const value = {
        isSearch,
        searchResults,
        searchQuery,
        performSearch,
        resetSearch
    };

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

async function mockSearch(query) {
    const allProducts = await searchProduct(query ?? '');
    return allProducts.books;
}

export function useSearch() {
    return useContext(SearchContext);
}