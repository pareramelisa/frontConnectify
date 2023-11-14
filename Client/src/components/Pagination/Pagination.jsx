/* eslint-disable react/prop-types */
import { Container } from './styledPagination';
import Fab from '@mui/material/Fab';
import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';

function Pagination({
  currentPage,
  adsPerPage,
  totalAds,
  onPageChange,
  //currentAds, propiedad para saber cuantos anuncios hay en cada pagina
}) {
  const [inputPage, setInputPage] = useState(currentPage);
  const totalPages = Math.ceil(totalAds / adsPerPage);
  const [showGoToPageButton, setShowGoToPageButton] = useState(false);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      setInputPage(currentPage + 1)
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      setInputPage(currentPage - 1)
    }
  };
  const handleInputChange = (event) => {
    setInputPage(event.target.value);

    if (event.target.value.trim() === '') {
      setShowGoToPageButton(false);
    } else {
      setShowGoToPageButton(true);
    }
  };

  const handleGoToPage = () => {
    const newPage = parseInt(inputPage, 10);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
      setInputPage(newPage.toString());
      setShowGoToPageButton(false); // Oculta el botón después de usarlo
    }
  };

  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  return (
    <Container>
      <Fab
        variant="extended"
        color="primary"
        onClick={handlePrevPage}
        disabled={currentPage === 1} // Deshabilitar el botón en la página 1
      >
        Back
      </Fab>
      <div
        style={{
          marginTop: '2.7em',
          marginLeft: '1em',
          marginRight: '1em',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {showGoToPageButton && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleGoToPage}
            disabled={!showGoToPageButton}
            style={{ marginBottom: '1em' }}
          >
            Ir
          </Button>
        )}
        <TextField
          color="primary"
          focused
          type="text"
          value={inputPage}
          onChange={handleInputChange}
          style={{ width: '80px', zIndex: '300' }}
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

