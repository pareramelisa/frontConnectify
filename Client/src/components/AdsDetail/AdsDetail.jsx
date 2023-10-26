import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
  } from "@mui/material";
import MercadoPago from "../Payments/MercadoPago";
import './DetailAd.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import { useLocation, useParams } from "react-router-dom";
import { fetchDetail } from '../../redux/Slices/detailSlice';
import Navbar from '../Navbar/Navbar'
import Login from "../Login/Login";
import { locationUser } from '../../redux/Slices/persistSlice';

const DetailAd = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  const [containerLogin, setContainerLogin] = useState(false)
  const location = useLocation()

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchDetail(id))
    .then(() => {
      setLoading(false);
    });
  }, [dispatch]);
  

  useEffect(() => {
    dispatch(locationUser(location.pathname));
  }, []);
  
  return (
    <div>
            <Navbar setContainerLogin={setContainerLogin}/>
      {containerLogin ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            padding: "20px",
            background: "rgba(0,0,0,0.5)",
            zIndex: "10",
            marginBottom: '1rem'
          }}
        >
          <Login  setContainerLogin={setContainerLogin}/>
        </div>
      ) : null}
    <div className='principal'>

       {loading ? (
        <div style={{ backgroundColor: "white", width: "100%", height: "100vh" }}>Cargando...</div>
      ) : (
        // Verifica si detail.detail.creator existe y tiene una longitud mayor que 0
        (detail.detail.creator && detail.detail.creator.length > 0) ? (
      <Grid container spacing={2}>
    <Grid item xs={8} align="left">
    <Grid item xs={6} sx={{ marginLeft: 3, width: "auto" }}>
      <Button sx={{ marginRight: 0.5, width: "100%" }} variant="contained">
        {detail.detail.categories}
      </Button>
    </Grid>
    <Grid item xs={12} md={10} sx={{ margin: '16px' }}>
      <Typography fontWeight="900" variant="h3" sx={{ margin: '10px' }}>
        {detail.detail.profession}
      </Typography>
      <Typography fontWeight="900" variant="h5" sx={{ margin: '10px' }}>
        Ubicación: {detail.detail.location}
      </Typography>
      
      <Typography fontWeight="900" variant="h4" sx={{ margin: '10px' }}>
        Descripción:
      </Typography>
      <Typography fontWeight="700" variant="body1" sx={{ margin: '10px' }}>
        {detail.detail.description}
      </Typography>
      <Card
        sx={{
          width: "100%",
          backgroundColor: "#D9D9D9",
          padding: '10px',
          margin: "0px"
        }}
        align="left"
      >
        <CardContent>
          <div className="profile-container">
            <div className="profile-circle">
              <img src="https://img.freepik.com/foto-gratis/retrato-hermoso-mujer-joven-posicion-pared-gris_231208-10760.jpg?w=740&t=st=1698081873~exp=1698082473~hmac=aba3c7f8d2e33cab05a648b7e5cb8a3a44a0f1242b4bb85fb6022a36e463fc15" alt="Imagen de perfil" />
            </div>
            <div className="profile-text">
              <Typography variant="h6">⭐5.0</Typography>
              <Typography fontWeight="900" variant="h5" component="div">
                Maria Emilia Fuentes
              </Typography>
              <Typography variant="body2">
                Muy amigable, amable y predispuesto a despejar dudas 07/08/23
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
      </Grid>
    <Grid item xs={8}>
    </Grid>
  </Grid>

  <Grid item xs={12} sm={6} md={4}>
    <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
      <CardMedia
        sx={{ height: 200 }}
        image={detail.detail.creator[0].image}
        title="tec"
      />
      <CardContent>
        <Typography fontWeight="900" variant="h5" component="div">
        {detail.detail.creator[0].name} {detail.detail.creator[0].lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{margin:"1em"}}>
        {detail.detail.creator[0].description}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <div>
              <List>
                <ListItem>
                  <Typography align="left">Tarifa: </Typography>
                  {detail.detail.price}$
                </ListItem>
                <ListItem>
                  <Typography>Modalidad: </Typography>
                  {detail.detail.workLocation}
                </ListItem>
              </List>
            </div>
          </Grid>
        </Grid>
       
        
        <MercadoPago />

      </CardContent>
    </Card>
  </Grid>
</Grid>
) : (
  <div>No hay creadores disponibles.</div>
)
)}
</div>
</div>
);
};


export default DetailAd;
