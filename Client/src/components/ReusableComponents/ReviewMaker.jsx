import React, { useState } from 'react';
import { Box, Typography, Rating, TextField, Button } from '@mui/material';

const ReviewForm = ({ professionalId, clientId, onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
 const [nameProf, setNameProf] = useState ('Nombre Profesional')
  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleAddReview = () => {
    // Validación: asegúrate de que el usuario haya ingresado una puntuación y texto
    if (rating === 0 || reviewText.trim() === '') {
      alert('Por favor, ingresa una puntuación y un comentario.');
      return;
    }

    // Crea un objeto de revisión con la puntuación, texto y los IDs
    const review = {
      professionalId,
      clientId,
      rating,
      text: reviewText,
    };

    // Llama a la función proporcionada por la prop para agregar la revisión
    onAddReview(review);

    // Limpia los campos después de agregar la revisión
    setRating(0);
    setReviewText('');
  };

  return (
    <Box
      sx={{
        backgroundColor: '#ffff',
        border: '1px solid #ccc', 
        borderRadius: 5,         
        padding: 3,             
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
        margin: '20px',         
      }}
    >
       <h2>Deja una reseña sobre {nameProf}</h2>
      <Box>
        <Rating
          name="rating"
          value={rating}
          precision={0.5} // Cambia la precisión según tus necesidades
          onChange={handleRatingChange}
          style={{ margin: '10px 0px' , fontSize: "24px"}}
        />
      </Box>
      <Box>
        <TextField
        sx={{ backgroundColor: '#D9D9D9', }}
          label="Escribe tu reseña"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={reviewText}
          onChange={handleReviewTextChange}
          style={{ margin: ' 5px 0px' }}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleAddReview} style={{ margin: ' 5px 0px' }}>
        Agregar reseña
      </Button>
    </Box>
  );
};

export default ReviewForm;
