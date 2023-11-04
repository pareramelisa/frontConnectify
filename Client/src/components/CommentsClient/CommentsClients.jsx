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
  const [newComment, setNewComment] = useState("");
  const [professionalId, setProfessionalId] = useState(""); // Almacenar professionalId en el estado
  

  useEffect(() => {
    if (isAuthenticated) {
      let clientId;

      if (user.sub.includes("google")) {
        clientId = user.nickname;
      } else {
        clientId = user.userName;
      }

      const paymentId = clientId;
      dispatch(getComments(paymentId));
    }
    
  }, [dispatch, isAuthenticated, user]);

  const handleComment = () => {
    if (newComment.trim() !== "") {
      const commentData = {
        comment: newComment,
        client: user.userName || user.nickname,
        professionalId: comments.detail.creator[0]._id,
      };
      console.log(professionalId, "profesional");

      console.log(user.userName, user.nickname,  "cliente");
      // Enviar el comentario al servidor utilizando Redux Toolkit
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