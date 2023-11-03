import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListSubheader, Typography } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

function BookingProf() {
  return (
    <List
      sx={{
        width: "800px",
        fontSize: "15px",
        boxShadow: 20,
        padding: "15px",
        height: "auto",
        marginTop: "20px",
      }}
    >
      <ListSubheader sx={{ fontSize: "25px", color: "black", padding: "10px" }}>
        <span style={{ display: "flex", alignItems: "center" }}>
          <BookmarkBorderIcon sx={{ marginRight: 1 }} fontSize="medium" />
          <Typography variant="body2" color="black" sx={{ fontSize: "25px" }}>
            Mis reservas
          </Typography>
        </span>
      </ListSubheader>
      {[1, 2, 3, 4, 5, 6].map((value) => (
        <ListItem key={value} sx={{padding: "15px"}}disableGutters>
          <Typography variant="body2" color="black" sx={{ fontSize: "15px" }}>
           {`Nombre del que reserva ${value} | Numero de contacto`}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}

export default BookingProf;
