import * as React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  CircularProgress,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import {
  deleteAd,
  disableAdStart,
  fetchAdsToProfDashboard,
} from "../../redux/Slices/createAdsSlice";
import { useState } from "react";
import { useEffect } from "react";
import { Delete } from "@mui/icons-material";

function AdsProfesional() {
  const dispatch = useDispatch();
  const [selectedAd, setSelectedAd] = useState("");
  const users = useSelector((state) => state.usersLogin.user);
  const loading = useSelector((state) => state.createAds.loading);
  const status = useSelector((state) => state.createAds.status);

  const ads = useSelector((state) => state.createAds.createAds);

  const userId = users._id;

  const handleDisable = (id) => {
    setSelectedAd(id);
    dispatch(disableAdStart());
    dispatch(deleteAd(id));
  };

  useEffect(() => {
    dispatch(fetchAdsToProfDashboard(userId));
  }, [dispatch]);

  return (
    <List
      sx={{
        marginRight: "80px",
        width: "800px",
        bgcolor: "lightGrey",
        boxShadow: 20,
        padding: "20px",
        height: "auto",
        marginTop: "30px",
      }}
    >
      <ListSubheader sx={{ fontSize: "25px", color: "black", padding: "5px" }}>
        <span style={{ display: "flex", alignItems: "center" }}>
          <LocalLibraryOutlinedIcon sx={{ marginRight: 1 }} fontSize="medium" />
          <Typography variant="body2" color="black" sx={{ fontSize: "25px" }}>
            Mis anuncios
          </Typography>
          <Link
            to="/professional/dashboardProf/createAds"
            style={{ marginLeft: "auto" }}
          >
            <IconButton aria-label="create">
              <AddIcon />
            </IconButton>
          </Link>
        </span>
      </ListSubheader>
      <Typography variant="body2" color="grey" sx={{ fontSize: "10px" }}>
            *Al deshabilitar un anuncio deberá contactarse con el administrador para habilitarlo nuevamente.
          </Typography>
      {status === "loading" ? (
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress />
        </Stack>
      ) : (
        ads.map((ad) => (
          <ListItem
            key={ad._id}
            sx={{ padding: "15px" }}
            disableGutters
            secondaryAction={
              ad.isDeleted ? (
                <Button
                  onClick={() => handleDisable(ad._id)}
                  variant="outlined"
                >
                  {loading && selectedAd === ad._id ? (
                    <CircularProgress size={25} />
                  ) : (
                    "Habilitar"
                  )}
                </Button>
              ) : (
                <>
                  <IconButton
                    aria-label="comment"
                    onClick={() => handleDisable(ad._id)}
                  >
                    {loading && selectedAd === ad._id ? (
                      <CircularProgress size={25} />
                    ) : (
                      <Delete />
                    )}
                  </IconButton>
                </>
              )
            }
          >
            <Typography variant="body2" color="black" sx={{ fontSize: "15px" }}>
              {`${ad.title}`}
            </Typography>
          </ListItem>
        ))
      )}
    </List>
  );
}

export default AdsProfesional;
