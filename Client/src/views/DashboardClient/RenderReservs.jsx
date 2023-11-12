import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';

const RenderReservs = ({ userName }) => {
  const [reservs, setReservs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        try {
            console.log('Props userName:', userName);

            const response = await fetch('https://connectifyback-dp-production.up.railway.app/payments/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            console.log('Data from endpoint:', data);

            const filteredReservs = data.filter(reserv => reserv.userName === userName && reserv.isCompleted !== "approved");
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
    <div>
      {loading && <CircularProgress />}

      {reservs && reservs.length === 0 && (
        <Typography variant="body2" component="p">
          No hay reservas pendientes de pago actualmente.
        </Typography>
      )}

      {reservs &&
        reservs.map(reserv => (
          <Card key={reserv._id}>
            <CardContent>
              <Typography variant="h9" component="div">
                
              </Typography>
              <Typography color="textSecondary">{new Date(reserv.date).toLocaleDateString()}</Typography>
              <Typography variant="body2" component="p">
              Profesional numero {reserv.professionalId}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default RenderReservs;
