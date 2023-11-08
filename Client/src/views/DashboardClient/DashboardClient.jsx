import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import UserInfoCard from './UserInfoCardClient';
import ButtonBack from '../../components/Utils/ButtonBack/ButtonBack';
import NavBarDemo2 from '../../components/NavBarDemo2/NavBarDemo2';

const DashboardClient = () => {

  const [editMode, setEditMode] = useState(false);
  const users = useSelector(state => state.usersLogin.user);

  const userName = users.name || "Nombre de usuario por defecto";
  const userLastName = users.lastName || "Apellido por defecto";
  const userLocation = users.location || "Ubicación por defecto";
  const userEmail = users.email || "maria@example.com";
  const userImage = users.image || "https://vivolabs.es/wp-content/uploads/2022/03/perfil-mujer-vivo.png";
  
  const userProvince = users.province || "Provincia por defecto";

  const [user, setUser] = useState({
    name: userName,
    LastName: userLastName, 
    email: userEmail,
   
    province:  userProvince,
    location: userLocation,
    image: userImage,
    
  });

 

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    // Aquí puedes agregar lógica para guardar los cambios en la información del usuario
    // Puedes enviar una solicitud de actualización al servidor, por ejemplo.
    setEditMode(false);
  };

 

  return (
    <div>
      <NavBarDemo2/>
      <div style={{ margin: '0em 3em' }}>
    <ButtonBack /> 
    <Grid container spacing={3}>
    
      <Grid item xs={12} md={8}>

      <UserInfoCard
    user={user}
    userImage={userImage}
    editMode={editMode}
    handleEdit={handleEdit}
    handleSave={handleSave}
    setUser={setUser}
  />
      

        
        
        
      </Grid>

      <Grid item xs={12} md={4}>
 
</Grid>

  
    </Grid>
    </div>
    </div>
  );
};
 
export default DashboardClient