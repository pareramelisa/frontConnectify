import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import HelpIcon from "@mui/icons-material/Help";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

export function CardProfileProf({ setPopUpModify }) {
  const profById = useSelector((state) => state.modifyProf.detailProf);

  const userName = profById.name;
  const userLastName = profById.lastName;
  const userLocation = profById.locationJob;
  const userEmail = profById.email;
  const userImage = profById.image;
  const userDescription = profById.description;
  const userNameUser = profById.userName;
  const userProfession = profById.profession;
  const userProvince = profById.province;

  const handlerPopUpModify = () => {
    setPopUpModify(true);
  };

  return (
    <Card sx={{ maxWidth: 300, margin: "25px", boxShadow: 20 }}>
      <div>
        <CardMedia
          component="img"
          alt="image professional"
          height="300"
          image={userImage}
          style={{ width: "300px" }} // Ajusta el ancho de la imagen
        />
        <CardContent style={{ flex: 1, height: "auto" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: "25px" }}
          >
            {userName} {userLastName} | {userProfession}
          </Typography>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <EmailIcon sx={{ marginRight: 1 }} fontSize="small" />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "15px" }}
            >
              {userEmail}
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <LocationOnIcon sx={{ marginRight: 1 }} fontSize="small" />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: 15 }}
            >
              {userLocation}, {userProvince}
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <PersonIcon sx={{ marginRight: 1 }} fontSize="small" />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: 15 }}
            >
              {userNameUser}
            </Typography>
          </div>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: 15 }}
          >
            {userDescription}
          </Typography>
        </CardContent>
      </div>
      <CardActions style={{ flex: 1, height: "auto" }}>
        <Link to="/chat">
          <Button variant="contained" size="small" startIcon={<HelpIcon />}>
            Ayuda
          </Button>
        </Link>
        <Link>
          <Button
            variant="contained"
            size="small"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handlerPopUpModify}
          >
            Modificar
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
