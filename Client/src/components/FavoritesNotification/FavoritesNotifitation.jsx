import React from 'react';
import { useSelector } from 'react-redux';
import { Badge, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FavoritesNotification = () => {
  const favoriteCount = useSelector((state) => state.favorites.favoriteCount);

  return (
    <Badge badgeContent={favoriteCount} color="secondary">
      <Link to="/client/favorites" style={{ textDecoration: 'none' }}>
        <Button variant="outlined" sx={{ margin: '0px' }}>
          Ver mis Favoritos <FavoriteBorderIcon sx={{ fontSize: 20 }} />
        </Button>
      </Link>
    </Badge>
  );
};

export default FavoritesNotification;
