import React, { useState } from 'react';
import  Grid  from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import ReviewItem from "../ReusableComponents/ReviewShow"
import ReviewForm from "../ReusableComponents/ReviewMaker"
import UserInfoCard from '../ReusableComponents/FieldsEdition';
import ChatComponent from '../ReusableComponents/ChatLateral';
import NavBarDemo2 from '../NavBarDemo2/NavBarDemo2'


const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const users = useSelector(state => state.usersLogin.user);

  const userName = users.name || "Nombre de usuario por defecto";
  const userLastName = users.lastName || "Apellido por defecto";
  const userLocation = users.location || "Ubicación por defecto";
  const userEmail = users.email || "maria@example.com";
  const userImage = users.image || "https://vivolabs.es/wp-content/uploads/2022/03/perfil-mujer-vivo.png";
  const userDescription = users.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla.";
  const userProfession = users.profession || "Profesión por defecto";
  const userProvince = users.province || "Provincia por defecto";

  const [user, setUser] = useState({
    name: userName,
    LastName: userLastName, 
    email: userEmail,
    description: userDescription,
    province:  userProvince,
    location: userLocation,
    image: userImage,
    profession: userProfession,
  });

  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    // Aquí puedes agregar lógica para guardar los cambios en la información del usuario
    // Puedes enviar una solicitud de actualización al servidor, por ejemplo.
    setEditMode(false);
  };

  const handleSendMessage = () => {
    if (message) {
      setChatMessages([...chatMessages, { text: message, sentByUser: true }]);
      // Aquí puedes agregar lógica para enviar mensajes en tiempo real
      setMessage('');
    }
  };

  return (
    <div>
      <NavBarDemo2/>
      <Grid container spacing={1} style={{ padding: "0px 16px " }}>
  
      <Grid item xs={12} md={8} >
     
      
      <UserInfoCard
    user={user}
    userImage={userImage}
    editMode={editMode}
    handleEdit={handleEdit}
    handleSave={handleSave}
    setUser={setUser}
  />

    <h2 style={{ padding: "0px 16px " }}>Mis reseñas realizadas</h2>
        <ReviewItem
          review={{
            rating: 4.5,
            text: 'Excelente servicio. Muy contento con el trabajo realizado.',
            clientProfileImage: 'https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg',
            clientName: 'Nombre_del_Profesional',
            date: '2023-11-01',
          }}
        />
        
      </Grid>

      <Grid item xs={12} md={4}>
        <h2 style={{ padding: "0px 16px " }}>Mis reseñas pendientes</h2>
      <ReviewForm/>
</Grid>

  
    </Grid>
    </div>
  );
};

export default Profile;
