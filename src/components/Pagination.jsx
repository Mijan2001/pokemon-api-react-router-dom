function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="flex justify-center gap-2 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-red-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Previous
            </button>
            <span className="px-4 py-2 dark:text-white">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-red-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
