/* eslint-disable react/prop-types */
import { Container } from './styledPagination';
import Fab from '@mui/material/Fab';
import { useState } from 'react';
import { TextField } from '@mui/material';

function Pagination({
  currentPage,
  adsPerPage,
  totalAds,
  onPageChange,
  //currentAds, propiedad para saber cuantos anuncios hay en cada pagina
}) {
  const [inputPage, setInputPage] = useState(currentPage);
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
  const handleInputChange = (event) => {
    setInputPage(event.target.value);
  };

  const handleInputPageChange = (event) => {
    if (event.key === 'Enter') {
      const newPage = parseInt(inputPage, 10);
      if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
        onPageChange(newPage);
        setInputPage(newPage);
      }
    }
  };

  return (
    <Container>
      {currentPage > 1 && (
        <Fab variant="extended" color="primary" onClick={handlePrevPage}>
          Back
        </Fab>
      )}
      <div
        style={{
          marginTop: '2.7em',
          marginLeft: '1em',
          marginRight: '1em',
          alignItems: 'center',
        }}
      >
        <TextField
          color="primary"
          focused
          type="number"
          value={inputPage}
          onChange={handleInputChange}
          onKeyDown={handleInputPageChange}
          style={{ width: '80px' }}
        />
        <h4 style={{ margin: '1em 0em 0em 0em', textAlign: 'center' }}>
          {currentPage} de {totalPages}
        </h4>
      </div>
      <Fab
        variant="extended"
        color="primary"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        style={{
          zIndex: '1',
        }}
      >
        Next
      </Fab>
    </Container>
  );
}

export default Pagination;
