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
        margin: '20px',
      }}
    >
     
       <h3 style={{ border: 'none', borderRadius: 5, padding: 1, margin: '20px' }}>Mi perfil</h3> 
    
      <CardHeader
        avatar={<Avatar src={userImage} />}
        title={editMode ? (
          <TextField
            label="Nombre"
            value={user.name}
            fullWidth
            required
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        ) : (
          user.name
        )}
        subheader={user.email}
        action={
          <IconButton onClick={handleEdit}>
            <Edit />
          </IconButton>
        }
      />
      <CardContent>
        {editMode ? (
          <div>
            <div style={{ marginBottom: '10px' }}>
              <TextField
                label="Apellido"
                value={user.LastName}
                fullWidth
                required
                onChange={(e) => setUser({ ...user, LastName: e.target.value })}
              />
            </div>
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
                label="Provincia falta connectar con el selector de ciudades"
                value={user.province}
                fullWidth
                required
                onChange={(e) => setUser({ ...user, province: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <TextField
                label="Ciudad falta connectar con el selector de ciudades"
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
