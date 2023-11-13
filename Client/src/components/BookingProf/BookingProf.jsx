import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListSubheader, Typography } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { getComments } from "../../views/DashboardClient/CommentsOrganized"; 
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

function BookingProf() {
  const [comments, setComments] = useState([]);
  const user = useSelector((state) => state.usersLogin.user);
  const userId = user._id;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getComments();
        setComments(commentsData);
      } catch (error) {
        console.error("Error al obtener comentarios:", error);
      }
    };

    fetchComments();
  }, [user._id]);

  console.log("todos los comentarios", comments);
  const userComments = comments.filter(
    (comment) => comment.professional_id === userId
  );
  console.log(
    "coments filtrados solo los que coinciden con el id del que esta registrado",
    userComments
  );

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
            Mis reseñas
          </Typography>
        </span>
      </ListSubheader>

      {userComments.length > 0 ? (
        userComments.map((comment, index) => (
          <ListItem key={index} sx={{ padding: "15px" }} disableGutters>
            <Typography variant="body2" color="black" sx={{ fontSize: "15px" }}>
              {`Nombre del cliente: ${comment.clientName} | Comentario: ${comment.comment} | Rating: ${comment.rating} `}
            </Typography>
          </ListItem>
        ))
      ) : (
        <Typography variant="body2" color="black" sx={{ fontSize: "15px" }}>
          No hay comentarios disponibles
        </Typography>
      )}
    </List>
  );
}

export default BookingProf;
