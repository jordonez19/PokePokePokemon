import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [...Array(totalPages).keys()].map(i => i + 1);

  return (
    <div>
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>Anterior</button>
      )}
      {pages.map(page => (
        <button key={page} onClick={() => onPageChange(page)} disabled={page === currentPage}>
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>Siguiente</button>
      )}
    </div>
  );
}

export default Pagination;
