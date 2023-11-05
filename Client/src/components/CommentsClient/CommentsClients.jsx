/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { getComments, postComment } from "../../redux/Slices/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
const Comments = () => {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  const users = useSelector(state => state.usersLogin.user)
  const comments = useSelector(state => state.comment.comments)
  const [newComment, setNewComment] = useState("");
  const [userDataOk, setUserDataOk] = useState("");


  useEffect(() => {
   
    if (isAuthenticated) {
      // Si el usuario está autenticado, obtén el valor correcto
      setUserDataOk(user.nickname || users.userName);
    }
    dispatch(getComments())
    console.log(comments, "getcom")
  }, [user, users, isAuthenticated, dispatch]);
 


  const handleComment = () => {
    if (newComment.trim() !== "") {
      const commentData = {
        comment: newComment,
        client: userDataOk,
        professionalId: detail.detail.creator[0]._id,
      };
      
      
      console.log("professionalId:", detail.detail.creator[0]._id);
  

      console.log("commentData:", commentData);
      dispatch(postComment(commentData));
      
   
      // Limpiar el campo de comentario después de enviar
      setNewComment("");
    }
  };
  

const professionalId = detail.detail.creator[0]._id;

const commentsForProfessional = comments.filter(
  (comment) => comment.Professional._id === professionalId
);


      return (
        <div>
          {commentsForProfessional.length > 0 ? (
            commentsForProfessional.map((comment) => (
              <Card
                key={comment._id}
                sx={{
                  width: "50%",
                  backgroundColor: "#D9D9D9",
                  padding: "10px",
                  margin: "10px 0",
                }}
                align="left"
              >
                <CardContent>
                  <div className="profile-container">
                   
                    <div className="profile-text">
                      <Typography variant="h6">⭐</Typography>
                     
                      <Typography variant="body2" sx={{ fontSize: "15px" }}>{comment.comment}</Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>El profesional aún no tiene comentarios.</p>
          )}
          <div>
            <h2>Agregar comentario</h2>
            <textarea
              name="Comentario"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleComment}>Enviar</button>
          </div>
        </div>
      );
  };

  export default Comments;