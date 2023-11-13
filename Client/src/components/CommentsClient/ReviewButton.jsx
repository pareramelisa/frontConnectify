/* eslint-disable react/prop-types */



import CommentBox from './CommentBox';

const ReviewButton = ({ professionalId, handleCommentBoxToggle, openCommentBoxId, hasCommented, handleClose }) => {

  
    if (!hasCommented) {
        console.log(hasCommented,"coment3" );
      return (
        <>
        <button onClick={() => handleCommentBoxToggle(professionalId)}>
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