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
import './DetailAd.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchDetail } from '../../redux/Slices/detailSlice';

const DetailAd = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(fetchDetail(id));
  }, [dispatch, id]);
  
  
  return (
    <div className='principal'>
      {detail.detail.creator && detail.detail.creator.length > 0 ? (
      <Grid container spacing={2}>
    <Grid item xs={8} align="left">
    <Grid item xs={6} sx={{ marginLeft: 3, width: "auto" }}>
      <Button sx={{ marginRight: 0.5, width: "100%" }} variant="contained">
        {detail.detail.categories}
      </Button>
    </Grid>
    <Container sx={{ width: 800 }}>
      <Typography fontWeight="900" variant="h2" gutterBottom>
        {detail.detail.title}
      </Typography>
      <Typography fontWeight="900" variant="h5" gutterBottom>
        Ubicación:
      </Typography>
      <Typography variant="h6" gutterBottom>
        {detail.detail.location}
      </Typography>
      <Typography fontWeight="900" variant="h4" gutterBottom>
        {detail.detail.description}
      </Typography>
        {/* Cambiar luego cuando se modifique el anuncio */}
      <Typography fontWeight="700" gutterBottom variant="body1">
        {detail.detail.creator[0].description} 
      </Typography>
    </Container>
    <Grid item xs={8}>
      <Card
        sx={{
          width: 700,
          backgroundColor: "#D9D9D9",
          padding: '10px',
          margin: "20px"
        }}
        align="left"
        gutterBottom
      >
        <CardContent>
          <div className="profile-container">
            <div className="profile-circle">
              <img src="https://img.freepik.com/foto-gratis/retrato-hermoso-mujer-joven-posicion-pared-gris_231208-10760.jpg?w=740&t=st=1698081873~exp=1698082473~hmac=aba3c7f8d2e33cab05a648b7e5cb8a3a44a0f1242b4bb85fb6022a36e463fc15" alt="Imagen de perfil" />
            </div>
            <div className="profile-text">
              <Typography variant="h6">⭐⭐⭐⭐</Typography>
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
  </Grid>
  <Grid item xs={4}>
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
        <Typography variant="body2" color="text.secondary">
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
                  <Typography>Modalidad: {detail.detail.workLocation}</Typography>
                </ListItem>
              </List>
            </div>
          </Grid>
        </Grid>
        <Button
          color="secondary"
          sx={{ maxWidth: 100, paddingX: 10 }}
        >
          Contactar
        </Button>
      </CardContent>
    </Card>
  </Grid>
</Grid>
) : (
  <div>Cargando...</div>
  )}
  </div> 
  );
};

export default DetailAd;