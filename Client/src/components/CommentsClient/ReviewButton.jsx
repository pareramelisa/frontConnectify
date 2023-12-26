/* eslint-disable react/prop-types */


import style from './Comments.module.css'
import CommentBox from './CommentBox';

const ReviewButton = ({ professionalId, handleCommentBoxToggle, openCommentBoxId, hasCommented, handleClose }) => {

  
    if (!hasCommented) {
       
      return (
        <>
        <button className={style.btnreseña} onClick={() => handleCommentBoxToggle(professionalId)}>
          Dejar reseña
        </button>
        {openCommentBoxId === professionalId && (
          <CommentBox onClose={handleClose} professionalId={professionalId} />
        )}
      </>
    );
  } else {
      return <p>✔ Ya le dejaste un comentario al profesional.</p>;
    }
  };
 
  export default ReviewButton;