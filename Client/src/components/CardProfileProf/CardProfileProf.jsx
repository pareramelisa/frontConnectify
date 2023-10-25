import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Profile from './Profile.jpg'; // Asegúrate de importar la imagen correcta
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export function CardProfileProf() {
  return (
    <Card sx={{ maxWidth: 400, margin: '20px', boxShadow: 20 }}>
      <div>
        <CardMedia
          component="img"
          alt="green iguana"
          height="300"
          image={Profile}
          style={{ width: '400px' }} // Ajusta el ancho de la imagen
        />
        <CardContent style={{ flex: 1, height: 'auto' }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: 30 }}>
            Mariana Fernandez | Abogada
          </Typography>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
            <EmailIcon sx={{ marginRight: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: 20 }}>
              marianafernandez@gmail.com
            </Typography>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
            <LocationOnIcon sx={{ marginRight: 1 }}/>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: 20 }}>
              Buenos Aires, CABA
            </Typography>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
            <AccessTimeIcon sx={{ marginRight: 1 }}/>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: 20 }}>
              Part-time
            </Typography>
          </div>
            
        
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 20 }}>
            Abogado dedicado y apasionado por la justicia con amplia experiencia en la representación legal. Especializado en proporcionar asesoramiento legal experto y representación en diversas áreas del derecho
          </Typography>
        </CardContent>
      </div>
      <CardActions style={{ flex: 1, height: 'auto'}}>
        <Button variant="contained" size="small">Ayuda</Button>
        <Button variant="contained" size="small" color="primary">Modificar</Button>
      </CardActions>
    </Card>
  );
}
