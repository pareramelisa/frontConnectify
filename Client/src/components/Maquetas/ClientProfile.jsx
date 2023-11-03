import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import ReviewItem from "./ReviewShow"
import ReviewForm from "./ReviewMaker"
import UserInfoCard from './FieldsEdition';
import ChatComponent from './ChatLateral';



const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const users = useSelector(state => state.usersLogin.user);

  const userName = users.name || "Nombre de usuario por defecto";
  const userLastName = users.lastName || "Apellido por defecto";
  const userLocation = users.location || "Ubicación por defecto";
  const userEmail = users.email || "maria@example.com";
  const userImage = users.image || "https://vivolabs.es/wp-content/uploads/2022/03/perfil-mujer-vivo.png";
  const userDescription = users.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla hendrerit, libero vel volutpat suscipit, quam sem mattis justo, in pharetra odio purus nec lectus. Nunc sit amet feugiat velit. Integer ultricies, velit eget dapibus dignissim, justo lectus auctor elit, eget ultricies ex tortor a ex. Sed a purus vehicula, fermentum justo in, suscipit tellus. Sed vitae quam nec erat convallis volutpat vel a quam. Vivamus nec massa eu orci interdum varius. Nulla facilisi. Proin varius massa ut odio aliquam interdum. Nulla in purus sit amet metus fringilla dictum. Sed viverra massa sit amet vehicula.";
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
        <ReviewForm />

        
        <ReviewItem
          review={{
            rating: 4.5,
            text: 'Excelente servicio. Muy contento con el trabajo realizado.',
            clientProfileImage: 'URL_de_la_foto',
            clientName: 'Nombre_del_cliente',
            date: '2023-11-01',
          }}
        />
        
      </Grid>

      <Grid item xs={12} md={4}>
  <ChatComponent
    chatMessages={chatMessages}
    message={message}
    setMessage={setMessage}
    handleSendMessage={handleSendMessage}
    userAvatar={userImage} // Pasa la imagen del usuario actual
    userName={userName} // Pasa el nombre del usuario actual
  />
</Grid>

  
    </Grid>
  );
};

export default Profile;
