/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Badge,
  Box,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import MercadoPago from "../Payments/MercadoPago";
import "./DetailAd.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchDetail } from "../../redux/Slices/detailSlice";
import Navbar from "../Navbar/Navbar";
import { locationUser } from "../../redux/Slices/persistSlice";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useAuth0 } from "@auth0/auth0-react";
import "./DetailAd.css";
import { Link } from "react-router-dom";
import {
  fetchAddFavorites,
  fetchRemoveFavorites,
} from "../../redux/Slices/favoritesSlice";
import Comments from "../CommentsClient/CommentsClients";
import ButtonBack from "../Utils/ButtonBack/ButtonBack";
import Loading from "../Utils/Loading/Loading";


const DetailAd = () => {
  const { user } = useAuth0();
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  const location = useLocation();

  const favorites = useSelector(
    (state) => state.favorites.favoriteProfessionals
  );
  const users = useSelector((state) => state.usersLogin.user);
  const userGoogle = useSelector((state) => state.googleLogin.user);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const newFav = favorites.some(
    (favorite) =>
      favorite?.professional?._id === detail?.detail?.creator[0]?._id
  );

  useEffect(() => {
    dispatch(fetchDetail(id)).then(() => {
      setLoading(false);
    });
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(locationUser(location.pathname));
  }, [dispatch, location]);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const handleSaveOrRemoveProfile = () => {
    let formFav;
    if (users._id) {
      formFav = {
        clientId: users._id,
        professionalId: detail.detail.creator[0]._id,
      };
    } else {
      formFav = {
        clientId: userGoogle._id,
        professionalId: detail.detail.creator[0]._id,
      };
    }

    if (!newFav) {
      dispatch(fetchAddFavorites(formFav));
    } else {
      dispatch(fetchRemoveFavorites(formFav));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="principal">
        {loading ? (
          <Loading />
        ) : detail.detail.creator && detail.detail.creator.length > 0 ? (
          <Grid container spacing={2}>
            <Grid item xs={8} align="left">
              <div style={{ paddingBottom: "1em" }}>
                <Link to={"/home"}>
                  <ButtonBack />
                </Link>
              </div>
              {users.types !== "admin" && users.types !== "professional" && (
                <Grid item xs={8} align="left">
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Button
                      sx={{
                        backgroundColor: !newFav ? "#D9D9D9" : "#3B7BA4",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      variant="contained"
                      onClick={handleSaveOrRemoveProfile}
                    >
                      {!newFav ? <StarBorderIcon /> : <StarIcon />}
                    </Button>
                  </Box>
                </Grid>
              )}

              <Grid item xs={12} md={10} sx={{ margin: "16px" }}>
                <Typography
                  fontWeight="900"
                  variant="h3"
                  sx={{ margin: "10px" }}
                >
                  {detail.detail.profession}
                </Typography>
                <Typography
                  fontWeight="900"
                  variant="h5"
                  sx={{ margin: "10px" }}
                >
                  Ubicación: {detail.detail.location}
                </Typography>
                <Typography
                  fontWeight="900"
                  variant="h4"
                  sx={{ margin: "10px" }}
                >
                  Descripción:
                </Typography>
                <Typography
                  fontWeight="700"
                  variant="body1"
                  sx={{ margin: "10px" }}
                >
                  {detail.detail.description}
                </Typography>
              </Grid>
              <Grid item xs={8}></Grid>
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
                    {detail.detail.creator[0].name}{" "}
                    {detail.detail.creator[0].lastName}
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
        )}
        <Comments />
      </div>
    </div>
  );
};

export default DetailAd;
