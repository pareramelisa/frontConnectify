import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetAllFavorites,
  fetchAddFavorites,
  fetchRemoveFavorites,
} from "../../redux/Slices/favoritesSlice";

const Favorites = () => {
  const users = useSelector((state) => state.usersLogin.user);
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state) => state.favorites.favoriteProfessionals
  );

  useEffect(() => {
    dispatch(fetchGetAllFavorites(users._id));
  }, []);

  const handleRemoveFavorite = (e) => {
    console.log(e);
    // const formFav = {
    //   clientId: users._id,
    //   professionalId: detail.detail.creator[0]._id,
    // };

    // const newFav = favorites.some(favorite => favorite.professional._id === detail.detail.creator[0]._id);

    // if (!newFav) {
    //   dispatch(fetchAddFavorites(formFav));
    // }else {
    //   dispatch(fetchRemoveFavorites(formFav))
    // }
  };

  return (
    <div>
      <Navbar />
      <div style={{ justifyContent: "center", padding: "5em" }}>
        <Typography variant="h4" component="h1">
          Perfiles Guardados
        </Typography>
        {favorites.length > 0 ? (
          favorites.map((fav, index) => (
            <div key={fav.professional._id}>
              {fav.professional && (
                <div>
                  <Card key={index} sx={{ marginBottom: "16px", width: "90%" }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        {/* <Grid item xs={12} sm={6} md={2}>
                          <Box display="flex" justifyContent="space-between">
                            <IconButton onClick={handleRemoveFavorite}>
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Box>
                        </Grid> */}
                        <Grid item xs={12} sm={6} md={2}>
                          <CardMedia
                            component="img"
                            height="200"
                            image={fav.professional.image}
                            alt={`Imagen de ${fav.professional.name}`}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <Typography variant="h5" component="div">
                            {fav.professional.name} {fav.professional.lastName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {fav.professional.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}></Grid>
                        <Grid item xs={12} sm={6} md={2}>
                          <Link to={`/detail/${fav.professional._id}`}>
                            <Button variant="contained" color="primary">
                              Ver Detalle
                            </Button>
                          </Link>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No tienes perfiles guardados.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;

// {favorites.length > 0 ? (
//   favorites.map((profile, index) => (
//     <Card key={index} sx={{ marginBottom: '16px', width: '90%' }}>
//       <CardContent>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6} md={2}>
//             <Box display="flex" justifyContent='space-between'>
//               <IconButton
//                 onClick={() => {
//                   handleRemoveFavorite(profile[0]);
//                 }}
//               >
//                 <DeleteIcon color="error" />
//               </IconButton>
//             </Box>
//           </Grid>
//           <Grid item xs={12} sm={6} md={2}>
//             <CardMedia
//               component="img"
//               height="200"
//               image={profile[0]?.professional?.image}
//               alt={`Imagen de ${profile[0]?.professional?.name}`}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <Typography variant="h5" component="div">
//               {profile[0]?.professional?.name} {profile[0]?.professional?.lastName}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {profile[0]?.professional?.description}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6} md={2}>
//             {/* Otro contenido */}
//           </Grid>
//           <Grid item xs={12} sm={6} md={2}>
//             <Link to={`/detail/${profile[0]?.professional?._id}`}>
//               <Button variant="contained" color="primary">
//                 Ver Detalle
//               </Button>
//             </Link>
//           </Grid>
//         </Grid>
//       </CardContent>
//     </Card>
//   ))
// ) : (
//   <p>No tienes perfiles guardados.</p>
// )}
