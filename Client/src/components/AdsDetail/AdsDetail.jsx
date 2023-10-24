// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import ListItem from '@mui/material/ListItem';
import './DetailAd.css';
import { useDispatch, useSelector } from 'react-redux';
import { detailAd, getByIdAd } from '../../redux/Slices/detailSlice';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";

const DetailAd = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const ad = useSelector(getByIdAd);
  
    useEffect(() => {
      dispatch(detailAd({ id }))
        .then((action) => {
          if (detailAd.fulfilled.match(action)) {
            console.log(action.payload, "Ad de useEffect");
          } else if (detailAd.rejected.match(action)) {
            console.error(action.error.message);
          }
        });
    }, [dispatch, id]);
  
    // Comprueba si ad está disponible, de lo contrario muestra un mensaje de carga
    if (!ad) {
      return <div>Cargando...</div>;
    }
    console.log(ad, "Ad de selector");
  
  
  return (
    <div className='principal'>
      <h1>{ad.description}</h1>
      <h1>{ad.location}</h1>
      <h1>{ad.creator[0].name}</h1>
      <h1>{ad.creator[0].lastName}</h1>
      <h1>{ad.creator[0].description}</h1>
       {/* <Grid container spacing={2}>
          <Grid item xs={8} align="left">
          <Grid item xs={6} sx={{ marginLeft: 3, width: 'auto' }}>
            <Button
              sx={{ marginRight: 0.5, width: '100%' }}
              variant="contained"
              >
              {ad.title}
            </Button>
          </Grid>
          <Container sx={{ width: 800 }}>
            <Typography fontWeight="900" variant="h2" gutterBottom>
              {ad.creator[0].name} {ad.creator[0].lastName}
            </Typography>
            <Typography fontWeight="900" variant="h5" gutterBottom>
              Ubicación:
            </Typography>
            <Typography variant="h6" gutterBottom>
              {ad.location}
            </Typography>
            <Typography fontWeight="900" variant="h4" gutterBottom>
              {ad.description}
            </Typography>
            <Typography fontWeight="700" gutterBottom variant="body1">
              {ad.creator[0].description}
            </Typography>
          </Container>
          <Grid item xs={8}>
            <Card
              sx={{
                width: 700,
                backgroundColor: '#D9D9D9',
                padding: '10px',
                margin: '20px',
              }}
              align="left"
              gutterBottom
              >
              <CardContent>
                <div className="profile-container">
                  <div className="profile-circle">
                    <img
                      src="https://img.freepik.com/foto-gratis/retrato-hermoso-mujer-joven-posicion-pared-gris_231208-10760.jpg?w=740&t=st=1698081873~exp=1698082473~hmac=aba3c7f8d2e33cab05a648b7e5cb8a3a44a0f1242b4bb85fb6022a36e463fc15"
                      alt="Imagen de perfil"
                      />
                  </div>
                  <div className="profile-text">
                    <Typography variant="h6">⭐⭐⭐⭐</Typography>
                    <Typography fontWeight="900" variant="h5" component="div">
                      Maria Emilia Fuentes
                    </Typography>
                    <Typography variant="body2">
                      Muy amigable, amable y predispuesto a despejar dudas
                      07/08/22
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Card sx={({ maxWidth: 345 }, { borderRadius: 5 })}>
            <CardMedia
              sx={{ height: 200 }}
              image={ad.creator[0].image}
              title="tec"
              />
            <CardContent>
              <Typography fontWeight="900" variant="h5" component="div">
              {ad.creator[0].name} {ad.creator[0].lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {ad.creator[0].description}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <div>
                    <List>
                      <ListItem>
                        <Typography align="left">Tarifa consulta: </Typography>
                        {ad.price}$
                      </ListItem>
                      <ListItem>
                        <Typography>Modalidad</Typography>: {ad.creator[0].remoteWork}
                      </ListItem>
                    </List>
                  </div>
                </Grid>
              </Grid>
              <Button
                color="secondary"
                sx={({ maxWidth: 100 }, { paddingX: 10 })}
                >
                Contactar
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}
    </div> 
  );
};

export default DetailAd;
