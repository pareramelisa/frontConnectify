import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import UserInfoCard from './UserInfoCardClient';
import { updateClientOnServer } from '../../redux/Slices/clientSlice';
import Navbar from '../../components/Navbar/Navbar';
import ReviewItem from '../../components/ReusableComponents/ReviewShow';
import { getComments } from './CommentsOrganized'; 
import { Link } from 'react-router-dom';
import RenderReservs from './RenderReservs';
import { Button, Card } from '@mui/material';
import { setUserType } from "../../redux/Slices/userTypeSlice";

const DashboardClient = () => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const usersBase = useSelector(state => state.clients.updater);//Los datos que se cambian en el formulario
  const users = useSelector(state => state.usersLogin.user); ////Los datos el usuario logueado

  const userName = usersBase && usersBase.name !== undefined ? usersBase.name : users.name;
  const userLastName = usersBase && usersBase.lastName !== undefined ? usersBase.lastName : users.lastName;
  const userLocation = usersBase && usersBase.location !== undefined ? usersBase.location : users.location;
  const userEmail = usersBase && usersBase.email !== undefined ? usersBase.email : users.email;
  const userImage = usersBase && usersBase.image !== undefined ? usersBase.image : users.image;
  const userProvince = usersBase && usersBase.province !== undefined ? usersBase.province : users.province;
  
  

  const [user, setUser] = useState({
    name: userName,
    LastName: userLastName, 
    email: userEmail,
    province:  userProvince,
    location: userLocation,
    image: userImage,
  });

  const [comments, setComments] = useState([]);
  const userComments = comments.filter(comment => comment.client_id === users._id);

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
    // console.log("updatedUser:", updatedUser);
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
    // console.log('Users after update:', users);
  // Llamada a la función getComments para obtener los comentarios
    const fetchComments = async () => {
      try {
        const commentsData = await getComments();
        setComments(commentsData);
      } catch (error) {
        console.error('Error al obtener comentarios:', error);
      }
    };

    fetchComments(); // Llama a la función de solicitud al montar el componente
  }, [users._id]); // Se ejecutará cada vez que cambie el ID del usuario

  const confirmAction = (actionType) => {
    const confirmationMessage = `¿Está seguro de que desea hacer un pedido para ${actionType}?`;

    if (window.confirm(confirmationMessage)) {
      if (actionType === "cambio de contraseña") {
       
        const userType = 'professional';
    dispatch(setUserType(userType));
    window.location.href = "/password";
      } else {
        alert(`Va a ser redirigido para realizar su pedido de ${actionType}.`);
        // Redirige al usuario al formulario correspondiente usando react-router-dom u otro enfoque de enrutamiento
      }
    }
  };

  return (
  
    <div style={{ backgroundColor: '#D9D9D9',  minHeight: '100vh', width: '100%' }}>
      <Navbar/>
      <div style={{ margin: '0em 2em' }}>
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
             <Card style={{ margin: '1em', borderRadius: '16px' }}>
            <div style={{ margin: '1.5em ' }}>
              <h3>Mis reservas realizadas</h3>
             <RenderReservs userName={users.userName} />
             <div style={{ margin: ' 1.5em' }}></div>
             <Link to={`/payments/${users.userName}`}>
              <Button variant="outlined">Ver pagos realizados</Button>   </Link>
             </div>
             </Card>
             <Card  style={{ margin: '1em', borderRadius: '16px', backgroundColor: '#868484'}}>
             <div style={{ margin: '1.5em  ' }}> 
              <h3> Administración de cuenta ⚠️</h3>
              <div style={{ margin: ' 1em 0em' }}>
              
              <Button variant="contained" color="secondary" style={{ marginRight: '2em' }}
              onClick={() => confirmAction('cambio de contraseña')}>
                Pedido de cambio de contraseña</Button>
                           
              <Button variant="contained" color="error" style={{ marginRight: '2em' }}
              onClick={() => confirmAction('eliminación de cuenta')}>
                Pedido de eliminación de cuenta</Button>
              </div>
              </div>
             </Card>
          </Grid>
           
          <Grid item xs={12} md={4}>
  <h3>Reseñas realizadas a profesionales luego de los servicios prestados:</h3>
  
  
  {userComments.length > 0 ? (
    userComments.map((comment, index) => (
      // <Link to={`/detail/${comment.client_id}`} key={index}>
      <ReviewItem
        key={index}
        review={{
          rating: comment.rating,
          text: comment.comment,
          clientProfileImage: comment.professionalPhoto,
          clientName: comment.professionalName,
          date: comment.date,
          professionalName: comment.professionalName,
          professionalProfileImage: comment.professionalPhoto,
        }}
      />
      // </Link>
    ))
  ) : (
    <p>No tienes reseñas aún</p>
  )}
</Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DashboardClient;
