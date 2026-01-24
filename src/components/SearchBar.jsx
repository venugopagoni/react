import React, { useState, useRef } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSearch, dynamic = true }) {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false); // for mobile
  const inputRef = useRef(null);

  const handleInput = (e) => {
    setQuery(e.target.value);
    if (dynamic && onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const handleExpand = () => {
    setExpanded(true);
    setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
  };

  const handleCollapse = () => {
    setExpanded(false);
    setQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <div className={styles.searchBarWrapper + (expanded ? ' ' + styles.expanded : '')}>
      <form className={styles.searchForm} onSubmit={handleSubmit} role="search" aria-label="Search blog posts">
        <label htmlFor="search-input" className={styles.srOnly}>Search posts</label>
        <input
          id="search-input"
          ref={inputRef}
          className={styles.searchInput}
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={handleInput}
          onFocus={() => setExpanded(true)}
          aria-label="Search posts"
        />
        <button type="submit" className={styles.searchButton} aria-label="Search">
          <span className={styles.searchIcon} aria-hidden="true">🔍</span>
        </button>
        {expanded && (
          <button type="button" className={styles.cancelButton} onClick={handleCollapse} aria-label="Cancel search">Cancel</button>
        )}
      </form>
    </div>
  );
}
