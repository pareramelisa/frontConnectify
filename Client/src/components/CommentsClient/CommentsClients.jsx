/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { getComments, postComment } from "../../redux/Slices/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
const Comments = () => {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.detail);
  const users = useSelector(state => state.usersLogin.user)
  const [newComment, setNewComment] = useState("");
  const [professionalId, setProfessionalId] = useState(""); // Almacenar professionalId en el estado
  const [userDataOk, setUserDataOk] = useState("");


  useEffect(() => {
    if (isAuthenticated) {
      // Si el usuario está autenticado, obtén el valor correcto
      setUserDataOk(user.nickname || users.userName);
    }
  }, [user, users, isAuthenticated]);

  const handleComment = () => {
    if (newComment.trim() !== "") {
      const commentData = {
        comment: newComment,
        client: userDataOk,
        professionalId: comments.detail.creator[0]._id,
      };
      
      
      console.log("professionalId:", comments.detail.creator[0]._id);
  

      console.log("commentData:", commentData);
      dispatch(postComment(commentData));

      // Limpiar el campo de comentario después de enviar
      setNewComment("");
    }
  };

  return (
    <div>
      <h3>Comentarios</h3>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.detail.creator[0]._id}>
              <div>{comment.comment}</div>
            </li>
          ))}
        </ul>
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