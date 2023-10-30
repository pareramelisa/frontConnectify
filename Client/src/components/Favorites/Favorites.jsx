
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from '../Navbar/Navbar'

import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../../redux/Slices/favoritesSlice';
const Favorites = () => {
  const [savedProfiles, setSavedProfiles] = useState([]);
  const dispatch = useDispatch();
  const favoritesCount = useSelector((state) => state.favorites.favoriteCount);

  useEffect(() => {
    // Obtiene las claves del Local Storage que comienzan con "favoritos-"
    const storageKeys = Object.keys(localStorage).filter((key) => key.startsWith('favoritos-'));

    // Obtiene los perfiles guardados y los almacena en el estado
    const profiles = storageKeys.map((key) => JSON.parse(localStorage.getItem(key)));
    setSavedProfiles(profiles);
  }, []);

  useEffect(() => {
    // Agrega un oyente de evento para capturar cambios en favoritos
    const handleFavoritesChange = () => {
      // Cuando el evento se dispare, vuelve a cargar los perfiles guardados
      const storageKeys = Object.keys(localStorage).filter((key) => key.startsWith('favoritos-'));
      const profiles = storageKeys.map((key) => JSON.parse(localStorage.getItem(key)));
      setSavedProfiles(profiles);
    };

    // Escucha el evento "favoritesChanged"
    window.addEventListener('favoritesChanged', handleFavoritesChange);

    return () => {
      window.removeEventListener("favoritesChanged", handleFavoritesChange);
    };
  }, []);

  const handleRemoveFavorite = (profile) => {
    const profileKey = `favoritos-${profile._id}`;
    localStorage.removeItem(profileKey);

    // Notificar a Redux para actualizar el conteo de favoritos
    dispatch(removeFavorite(profile));
    const event = new Event('favoritesChanged');
    window.dispatchEvent(event);
  };

  return (
    <div>
    <Navbar />
    <div style={{  justifyContent: 'center', padding:"5em" }}>
      <Typography variant="h4" component="h1">
        Perfiles Guardados
      </Typography>
      {savedProfiles.length > 0 ? (
        savedProfiles.map((profile, index) => (
          <Card key={index} sx={{ marginBottom: '16px', width: '90%' }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={2}>
                  <Box display="flex" justifyContent='space-between'>
                    <IconButton
                      onClick={() => {
                        const profileKey = `favoritos-${profile._id}`;
                        localStorage.removeItem(profileKey);

                        // Emite un evento personalizado para notificar cambios en favoritos
                        const event = new Event('favoritesChanged');
                        window.dispatchEvent(event);
                      }}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={profile.creator[0].image}
                    alt={`Imagen de ${profile.creator[0].name}`}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="h5" component="div">
                    {profile.creator[0].name} {profile.creator[0].lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profile.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <Link to={`/detail/${profile._id}`}>
                    <Button variant="contained" color="primary">
                      Ver Detalle
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No tienes perfiles guardados.</p>
      )}
    </div>
    </div>
  );
};

export default Favorites;
