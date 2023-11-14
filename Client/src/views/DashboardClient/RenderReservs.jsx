import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress, Avatar, Grid } from '@mui/material';

const RenderReservs = ({ userName }) => {
  const [reservs, setReservs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Props userName:', userName);

        const response = await fetch(`https://connectifyback-dp-production.up.railway.app/payments/search/${userName}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log('Data from endpoint:', data);

        const filteredReservs = data.filter(reserv => reserv.userName === userName && reserv.isCompleted === "approved");
        console.log('Filtered Reservs:', filteredReservs);

        setReservs(filteredReservs);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userName]);

  return (
    <>
      {loading && <CircularProgress />}

      {reservs === null && !loading && (
        <Typography variant="body2">
          Cargando...
        </Typography>
      )}

      {reservs && reservs.length === 0 && !loading && (
        <Typography variant="body2">
          No hay reservas pendientes de pago actualmente.
        </Typography>
      )}

      {reservs && reservs.length > 0 && !loading && (
        <div>
          {reservs.map(reserv => (
            <Card key={reserv._id}>
              <Grid container spacing={2} style={{ alignItems: 'center', margin: '0px', padding: '2px' }}>
                <Typography color="textSecondary" style={{ margin: '5px', padding: '6px' }}>
                  {new Date(reserv.date).toLocaleDateString()}
                </Typography>
                <Avatar src={reserv.professionalId.image} />
                <CardContent>
                  <Typography variant="body2">
                    {reserv.professionalId.name} {reserv.professionalId.lastName} ({reserv.professionalId.profession[0]})
                  </Typography>
                  <Typography variant="body2">
                    <a href={`mailto:${reserv.professionalId.email}`}>{reserv.professionalId.email}</a>
                  </Typography>
                </CardContent>
                <Typography variant="body2">
                 
                </Typography>
              </Grid>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default RenderReservs;
