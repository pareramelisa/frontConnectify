import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';

export function CardProfileProf() {

  const users = useSelector(state => state.usersLogin.user)
  console.log(users)
  
  const userName = users.name
  const userLastName = users.lastName
  const userLocation = users.location
  const userEmail = users.email
  const userImage = users.image
  const userDescription = users.description
  const userNameUser = users.userName
  const userProfession = users.profession
  const userProvince = users.province 

  return (
    <Card sx={{ maxWidth: 400, margin: '20px', boxShadow: 20 }}>
      <div>
        <CardMedia
          component="img"
          alt="image professional"
          height="300"
          image={userImage}
          style={{ width: '400px' }} // Ajusta el ancho de la imagen
        />
        <CardContent style={{ flex: 1, height: 'auto' }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: 30 }}>
          {userName} {userLastName} | {userProfession}
          </Typography>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
            <EmailIcon sx={{ marginRight: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: 20 }}>
              {userEmail}
            </Typography>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
            <LocationOnIcon sx={{ marginRight: 1 }}/>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: 20 }}>
              {userLocation}, {userProvince}
            </Typography>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
            <PersonIcon sx={{ marginRight: 1 }}/>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: 20 }}>
              {userNameUser}
            </Typography>
          </div>
                    
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 20 }}>
            {userDescription}
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
