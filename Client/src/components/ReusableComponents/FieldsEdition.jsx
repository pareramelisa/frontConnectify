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
     
       <h2 style={{ border: 'none', borderRadius: 5, padding: 1, margin: '20px' }}>Mi perfil</h2> 
    
      <CardHeader
        avatar={<Avatar src={userImage} />}
        title={editMode ? (
          <TextField
            label="Nombre"
            value={user.name}
            fullWidth
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
                onChange={(e) => setUser({ ...user, LastName: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <TextField
                label="Email"
                value={user.email}
                fullWidth
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <TextField
                label="Provincia"
                value={user.province}
                fullWidth
                onChange={(e) => setUser({ ...user, province: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <TextField
                label="Ciudad"
                value={user.location}
                fullWidth
                onChange={(e) => setUser({ ...user, location: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <TextField
                label="Profesión"
                value={user.profession}
                fullWidth
                onChange={(e) => setUser({ ...user, profession: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <TextField
                label="Descripción"
                value={user.description}
                fullWidth
                multiline
                rows={6}
                style={{ fontWeight: 'normal' }} // Aplica el estilo aquí
                onChange={(e) => setUser({ ...user, description: e.target.value })}
              />
            </div>
            <Button onClick={handleSave} variant="contained" color="primary" style={{ marginTop: '5px' }}>
              Guardar
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
