import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { CardActionArea, CardActions } from "@mui/material";

const Professional = ({ id, name, lastName, location, description, profession, image, categories }) => {
  const fullName = `${name} ${lastName}`;

  const cardStyle = {
    boxShadow: 20,
    marginBottom: "40px",
    display: "flex",
    flexDirection: "column",
    height: "42em",
    width: "300px"
    
  };

  const imageStyle = {
    position: "relative",
  };

  const nameStyle = {
    position: "absolute",
    top: "260px",
    left: "10px",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };

  const locationStyle = {
    position: "absolute",
    top: "235px",
    left: "10px",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };

  const badgeContainerStyle = {
    marginLeft:"40px",
    marginBottom:"10px",
    position: "absolute",
    bottom: "-8em",
  };

  return (
    <Link to={`/detail/${id}`}>
      <Card sx={cardStyle}>
        <CardActionArea>
          <CardMedia component="img" height="400em" image={image} alt="prueba" sx={imageStyle} />
          <Typography variant="h3" component="div" sx={nameStyle}>
            {fullName}
          </Typography>
          <Typography variant="h6" component="div" sx={locationStyle}>
            {location}
          </Typography>
          <CardContent>
            <Typography variant="h5" component="div">
              ⭐5.0 (20 reviews)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Categories: {categories} 
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={badgeContainerStyle}>
          <Badge badgeContent={profession} color="primary" />
        </CardActions>
      </Card>
    </Link>
  );
};

export default Professional;
