import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import UserInfoCard from './UserInfoCardClient';
import { updateClientOnServer } from '../../redux/Slices/clientSlice';
import Navbar from '../../components/Navbar/Navbar';
import ReviewItem from '../../components/ReusableComponents/ReviewShow';

const DashboardClient = () => {
  const dispatch = useDispatch();
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

  const handleSave = async () => {
    const updatedUser = {
      _id: users._id,
       name: user.name,
      lastName: user.LastName,
      userName: users.userName,
      location: user.location,
      province: user.province,

    };
    console.log("updatedUser:", updatedUser);
    try {
      // Envía la solicitud PATCH al servidor para actualizar el cliente
      const response = await dispatch(updateClientOnServer(updatedUser));
      if (response) {
        setEditMode(false);
        alert("Su cambio se ha guardado con éxito");
      } else {
        // Manejar el caso en que la actualización no sea exitosa
        console.error('Error al actualizar el cliente:', response);
      }
    } catch (error) {
      // Maneja el error, por ejemplo, mostrando un mensaje al usuario
      console.error('Error al actualizar el cliente:', error);
    }
  };

  useEffect(() => {
    console.log('Users after update:', users);
  }, [users]);

  return (
    <div>
      <Navbar/>
      <div style={{ margin: '0em 3em' }}>
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
            <h3>Reseñas realizadas</h3>
            <ReviewItem
              review={{
                rating: 4.5,
                text: 'Excelente servicio. Muy contento con el trabajo realizado.',
                clientProfileImage: 'URL_de_la_foto',
                clientName: 'Nombre_del_profesional que brindó el servicio',
                date: '2023-11-01',
              }}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DashboardClient;
