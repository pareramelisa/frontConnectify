import React from 'react';
import { Card, CardContent, CardHeader, Avatar, Typography, IconButton, TextField, Button } from '@mui/material';
import { Edit } from '@mui/icons-material';

const UserInfoCard = ({ user, userImage, editMode, handleEdit, handleSave, setUser }) => {
  return (
    <Card
      sx={{
        border: 'none',
        borderRadius: 5,
        padding: 1,
        margin: '1em',
      }}
    >
     
       <h3 style={{ border: 'none', borderRadius: 5, padding: 1, margin: '1em' }}>Mi perfil</h3> 
    
      <CardHeader
        avatar={<Avatar src={userImage} sx={{ width: 100, height: 100 }} />}
        title={editMode ? (
          <p>Edita tu perfil acutalizando tu domicilio para recibir listados de profesionales en tu zona  en tu casillla de email:</p>
          // <TextField
          //   label="Nombre"
          //   value={user.name}
          //   fullWidth
          //   required
          //   onChange={(e) => setUser({ ...user, name: e.target.value })}
          // />
        ) : (
          <Typography variant="h5" gutterBottom>
            {user.name} {user.LastName}
          </Typography>
        )}
        subheader={
          <div>
            <Typography variant="h6" >
            {user.email}

            </Typography>
          </div>
        }
        action={
          <IconButton onClick={handleEdit}>
            <Edit />
          </IconButton>
        }
      />
      <CardContent>
        {editMode ? (
          <div>
            {/* <div style={{ marginBottom: '10px' }}>
              <TextField
                label="Apellido"
                value={user.LastName}
                fullWidth
                required
                onChange={(e) => setUser({ ...user, LastName: e.target.value })}
              />
            </div> */}
            {/* <div style={{ marginBottom: '10px' }}>
              <TextField
                label="Email"
                value={user.email}
                fullWidth
                required
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div> */}
            <div style={{ marginBottom: '10px' }}>
              <TextField
                label="Provincia"
                value={user.province}
                fullWidth
                required
                onChange={(e) => setUser({ ...user, province: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <TextField
                label="Ciudad"
                value={user.location}
                fullWidth
                required
                onChange={(e) => setUser({ ...user, location: e.target.value })}
              />
            </div>
            
            
            <Button onClick={handleSave} variant="contained" color="primary" style={{ marginTop: '5px' }}>
              Guardar cambios
            </Button>
          </div>
        ) : (
          <div>
            <Typography variant="subtitle1" gutterBottom>
               {user.description}
            </Typography>
            
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
