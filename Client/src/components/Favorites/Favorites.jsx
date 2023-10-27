import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [savedProfiles, setSavedProfiles] = useState([]);

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

    // Limpia el oyente de evento al desmontar el componente
    return () => {
      window.removeEventListener('favoritesChanged', handleFavoritesChange);
    };
  }, []);

  return (
    <div>
      <h1>Perfiles Guardados</h1>
      {savedProfiles.length > 0 ? (
        <Grid container spacing={2}>
          {savedProfiles.map((profile, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <CardMedia
                    component="img"
                    height="140"
                    image={profile.creator[0].image}
                    alt={`Imagen de ${profile.creator[0].name}`}
                  />
                  <Typography variant="h5" component="div">
                    {profile.creator[0].name} {profile.creator[0].lastName} {profile.profession}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profile.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profile.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      const profileKey = `favoritos-${profile._id}`;
                      localStorage.removeItem(profileKey);

                      // Emite un evento personalizado para notificar cambios en favoritos
                      const event = new Event('favoritesChanged');
                      window.dispatchEvent(event);
                    }}
                  >
                    Eliminar
                  </Button>
                  <Link to={`/detail/${profile._id}`}>
                    <Button variant="contained" color="primary">
                      Ver Detalle
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No tienes perfiles guardados.</p>
      )}
    </div>
  );
};

export default Favorites;
