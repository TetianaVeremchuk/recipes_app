type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const generatePageNumbers = () => {
    if (totalPages <= 10) {
      return [...Array(totalPages).keys()].map((n) => n + 1);
    }

    if (currentPage <= 5) {
      return [1, 2, 3, 4, 5, 6, 7, '...', totalPages];
    }

    if (currentPage >= totalPages - 4) {
      return [1, '...', totalPages - 6, totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        {'<'}
      </button>

      {generatePageNumbers().map((page, index) => (
        <button
          key={index}
          disabled={page === '...' || page === currentPage}
          onClick={() => typeof page === 'number' && onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
