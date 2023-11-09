/* eslint-disable react/prop-types */
import { Container } from "./StyledPagination";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import { TextField, Button } from "@mui/material";

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
      //   setInputPage(currentPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  //   const handleInputChange = (event) => {
  //     setInputPage(event.target.value);

  //     if (event.target.value.trim() === "") {
  //       setShowGoToPageButton(false);
  //     } else {
  //       setShowGoToPageButton(true);
  //     }
  //   };

  return (
    <Container>
      <Fab
        variant="extended"
        color="primary"
        disabled={currentPage === 1}
        onClick={handlePrevPage}
      >
        Back
      </Fab>

      <div
        style={{
          marginTop: "2.7em",
          marginLeft: "1em",
          marginRight: "1em",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          color="primary"
          focused
          type="text"
          value={currentPage}
          style={{
            width: "60px",
            textAlign: "center",
          }}
        />
        <h4 style={{ margin: "1em 0em 0em 0em", textAlign: "center" }}>
          {currentPage} de {totalPages}
        </h4>
      </div>
      <Fab
        variant="extended"
        color="primary"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        style={{
          zIndex: "1",
        }}
      >
        Next
      </Fab>
    </Container>
  );
}

export default Pagination;
