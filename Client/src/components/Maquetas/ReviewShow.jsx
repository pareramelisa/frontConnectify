import React from 'react';
import { Box, Typography, Rating, Avatar } from '@mui/material';

const ReviewItem = ({ review }) => {
  const { rating, text, clientProfileImage, clientName, date } = review;

  return (
    <Box
      sx={{
        backgroundColor: '#D9D9D9',
        border: '1px solid #ccc', // Borde
        borderRadius: 5,         // Esquinas redondeadas
        padding: 2,             // Relleno
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombra
        margin: '20px',         // Margen exterior de 10px
      }}
    >
      <Box display="flex" alignItems="center">
        <Avatar src={clientProfileImage} alt={clientName} />
        <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
          {clientName}
        </Typography>
      </Box>
      <Rating name="rating" value={rating} precision={0.5} readOnly />
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        {text}
      </Typography>
      <Typography variant="caption" sx={{ marginTop: 1 }}>
        {date}
      </Typography>
    </Box>
  );
};

export default ReviewItem;
