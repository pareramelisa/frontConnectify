/* eslint-disable react/prop-types */
function Pagination({
  currentPage,
  adsPerPage,
  totalAds,
  onPageChange,
  currentAds,
}) {
  const totalPages = Math.ceil(totalAds / adsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div>
      {currentPage > 1 && (
        <button onClick={handlePrevPage}>Back</button>
      )}

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
