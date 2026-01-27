// components/Pagination.jsx
import React from "react";

export default function Pagination({ page, totalPages, onPageChange }) {
    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 border disabled:opacity-50"
        >
          Prev
        </button>
  
        {[...Array(totalPages)].map((_, i) => {
          const pageNumber = i + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`px-3 py-1 border ${
                page === pageNumber ? "bg-blue-500 text-white" : ""
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
  
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  }
  