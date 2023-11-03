/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { FetchAllComments, commentPost } from "../../redux/Slices/commentSlice"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const comments = ({clientId, professionalId}) => {
const dispatch = useDispatch();
const [newComment, setNewComment] = useState("")
const comments = useSelector((state) => state.commentSlice.comments);

useEffect (() => {
  dispatch(FetchAllComments())
}, [dispatch])

// Filtra los comentarios que coinciden con el ID del profesional
  const filteredComments = comments.filter((comment) => comment.professional === professionalId);
  console.log(professionalId, "este es el ID com")

const handleComment = () => {
  if (newComment.trim() !== "") {
    const commentData = {
      comment: newComment,
      client: clientId, // Asegúrate de tener el cliente disponible
      professional: professionalId, // Asegúrate de tener el profesional disponible
    };

    dispatch(commentPost(commentData));
    setNewComment("");
}

}

return (
  <div>
    {filteredComments.length > 0 ? (
      <div>
        <h3>Comentarios</h3>
        <ul>
          {filteredComments.map((comment) => (
            <li key={comment._id}>
              <div>{comment.comment}</div>
            </li>
          ))}
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
    ) : (
      <p>No hay comentarios disponibles.</p>
    )}
  </div>
);
};

export default comments;