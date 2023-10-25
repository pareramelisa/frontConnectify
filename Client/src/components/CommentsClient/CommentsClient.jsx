/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  getComments,
  postComment,
  deleteComments,
} from "../../redux/Slices/commentsSlice";
import { useDispatch, useSelector } from "react-redux";
const Comments = ({ clientId, professionalId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment?.comments || []);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  const handleComment = () => {
    if (newComment.trim() !== ""){
    
        const commentData = {
          comment: newComment,
          client: clientId, 
          professional: professionalId,
        };
  
        // Enviar el comentario al servidor utilizando Redux Toolkit
        dispatch(postComment(commentData));
  
        // Limpiar el campo de comentario después de enviar
        setNewComment("");
      }
    }

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComments(commentId));
  };

  return (
    <div>
      <h3>Comentarios</h3>
      <ul>
        {comments.map((comment) => {
          <li key={comment._id}>
            <div>{comment.comment}</div>
            <button onClick={() => handleDeleteComment(comment._Id)}>
              Eliminar
            </button>
          </li>;
        })}
      </ul>
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