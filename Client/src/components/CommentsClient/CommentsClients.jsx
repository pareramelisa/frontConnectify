/* eslint-disable react/prop-types */
import { useEffect } from "react";
import {
  postComments,
  getCommentById,
} from "../../redux/Slices/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Comments = ({ clientId, professionalId }) => {
  console.log(professionalId, "prof componente")
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment?.comments || []);
  const [newComment, setNewComment] = useState("");

  const handleComment = () => {
    if (newComment.trim() !== "") {
      const commentData = {
        comment: newComment,
        client: clientId,
        professional: professionalId,
      };

      // Enviar el comentario
      dispatch(postComments(commentData));

      // Limpiar el campo de comentario después de enviar
      setNewComment("");
    }
  };

  useEffect(() => {
    dispatch(getCommentById(professionalId));
  }, [dispatch, professionalId]);
  console.log(professionalId)

 

  return (
    <div>
      {comments.length > 0 ? ( // Verifica si hay comentarios disponibles
        <div>
          <h3>Comentarios</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                <div>{comment.comment}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No hay comentarios disponibles.</p> // Mensaje si no hay comentarios
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

export default Comments