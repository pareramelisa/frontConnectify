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
  //currentAds,
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
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 448 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
        </svg>{" "}
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
            width: "40px",
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
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 448 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
        </svg>
      </Fab>
    </Container>
  );
}

export default Pagination;
