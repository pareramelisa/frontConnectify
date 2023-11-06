/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { getComments, postComment } from "../../redux/Slices/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Rating from "react-rating-stars-component";
import style from "./Comments.module.css";
const Comments = () => {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  const users = useSelector((state) => state.usersLogin.user);
  const comments = useSelector((state) => state.comment.comments);
  const [newComment, setNewComment] = useState("");
  const [userDataOk, setUserDataOk] = useState("");
  const [rating, setRating] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
 

  useEffect(() => {
    if (isAuthenticated) {
      // Si el usuario está autenticado, obtén el valor correcto
      setUserDataOk(user.nickname || users.userName);

    }
    dispatch(getComments());
    console.log(comments, "getcom");
    
  }, [user, users, isAuthenticated, dispatch]);

  console.log(users, "comment");

  const handleChange = (newRating) => {
    setRating(newRating); // Actualiza el valor de rating
  };
  

  const handleComment = () => {
    if (newComment.trim() !== "" ) {
      const commentData = {
        comment: newComment,
        client: users.userName,
        professionalId: detail.detail.creator[0]._id,
        rating: rating,
      };
      console.log(rating);
      console.log("userDataOk:", userDataOk);
      dispatch(postComment(commentData));
      console.log("El rating no es válido");
      // Limpiar el campo de comentario después de enviar
      setNewComment("");
      setRating(0);
     
    }
  };

  const professionalId = detail.detail.creator[0]._id;

  const commentsForProfessional = comments.filter(
    (comment) => comment.Professional._id === professionalId
  );

 

   return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse", // Esto invierte el orden de los elementos
          alignItems: "flex-start",
          marginTop: "20px",
        }}
      >
        
          <div>
            <Box
              sx={{
                width: "75%",
                backgroundColor: "#D9D9D9",
                border: "1px solid #ccc",
                borderRadius: 5,
                padding: 2,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                marginRight: "10em", // Agregamos margen a la derecha
              }}
            >
              <Typography
                variant="h2"
                sx={{ marginBottom: 1, fontSize: "22px", fontWeight: "bold" }}
              >
                Agregar comentario
              </Typography>
              <Rating
                name="rating"
                value={rating}
                count={5}
                size={24}
                precision={0.5}
                onChange={handleChange}
              />
              <textarea
                name="Comentario"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className={style.textarea}
              />

              <button onClick={handleComment} className={style.button}>
                Enviar
              </button>
            </Box>
          </div>
      
        <div>
          {commentsForProfessional.length > 0 ? (
            commentsForProfessional.map((comment) => (
              <Card
                key={comment._id}
                sx={{
                  width: "75%",
                  backgroundColor: "#D9D9D9",
                  padding: "10px",
                  margin: "10px 0",
                  marginRight: "750px",
                }}
                align="left"
              >
                <CardContent>
                  <div className="profile-container">
                    <div className="profile-text">
                    <Typography variant="h6">
  {[...Array(comment.rating)].map((_, index) => (
    <span key={index}>⭐</span>
  ))}
</Typography>
                     
                      <Typography variant="body2" sx={{ fontSize: "15px" }}>
                        {comment.comment}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card
            sx={{
              width: "75%",
              backgroundColor: "#D9D9D9",
              padding: "10px",
              margin: "10px 0",
              marginRight: "750px",
            }}
            align="left"
          >
            <CardContent>
              <div className="profile-container">
                <div className="profile-text">
                  <Typography variant="body2" sx={{ fontSize: "15px", fontWeight: "bold"}}>
                    El profesional aún no tiene comentarios.
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Box>
    </div>
  );
};

export default Comments;