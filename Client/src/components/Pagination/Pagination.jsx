/* eslint-disable react/prop-types */
import {Container} from "./styledPagination";
import Fab from '@mui/material/Fab'

function Pagination({
  currentPage,
  adsPerPage,
  totalAds,
  onPageChange,
  //currentAds,
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
    <Container>
      {currentPage > 1 && (
        <Fab 
        variant="extended" 
        color="primary" 
        onClick={handlePrevPage}>
          Back
        </Fab>
      )}

      <Fab
        variant="extended" 
        color="primary"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        style={{
          zIndex: '1'
        }}
      >
        Next
      </Fab>
    </Container>
  );
}

export default Pagination;
