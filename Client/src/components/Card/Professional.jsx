/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { CardActionArea, CardActions } from "@mui/material";

import { Link } from "react-router-dom";

// Professional.propTypes = {
//   name: PropTypes.string.isRequired,
//   lastName: PropTypes.string.isRequired,
//   location: PropTypes.string,
//   description: PropTypes.string,
//   price: PropTypes.number,
//   profession: PropTypes.string,
//   image: PropTypes.string,
//   rating: PropTypes.number,
//   categories: PropTypes.arrayOf(PropTypes.string),
// };

 const Professional = ({name,
  lastName,
  location,
  
  description,
  price,
  profession,
  image,
  //rating,
  categories,}) => {
  

 {
  return (
    <Link to="/detail/:profesional_id">
      <Card sx={{ maxWidth: 345, position: "relative" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="350px"
            image={image}
            alt="prueba"
            style={{ position: "relative" }}
          />
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            style={{
              position: "absolute",
              bottom: "160px", // Ajusta el valor para la posición vertical
              left: "10px", // Ajusta el valor para la posición horizontal
              color: "#fff", // Color del texto
              padding: "10px", // Ajusta el espacio alrededor del texto
              borderRadius: "5px",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            {name}
            {lastName}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            style={{
              position: "absolute",
              bottom: "145px",
              left: "10px",
              color: "#fff",
              padding: "10px",
              borderRadius: "5px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              top: "auto",
            }}
          >
            {location}
          </Typography>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
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
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Badge
              badgeContent={profession}
              color="primary"
              style={{ marginRight: "25px" }}
            >
              <div
                style={{
                  padding: "15px",
                  borderRadius: "5px",
                }}
              ></div>
            </Badge>
            <Badge badgeContent="Notary" color="primary">
              <div
                style={{
                  padding: "15px",
                  borderRadius: "5px",
                }}
              ></div>
            </Badge>
          </div>
          <Badge
            badgeContent={price}
            color="primary"
            style={{ marginLeft: "auto", marginRight: "35px" }}
          >
            <div
              style={{
                padding: "40px",
                borderRadius: "5px",
              }}
            ></div>
          </Badge>
        </CardActions>
      </Card>
    </Link>
  );
}
}

export default Professional