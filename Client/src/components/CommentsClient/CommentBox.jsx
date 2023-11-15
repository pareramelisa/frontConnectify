/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import {  postComment } from "../../redux/Slices/commentSlice";
import {  Typography, Box } from "@mui/material";
import Rating from "react-rating-stars-component";
import style from "./Comments.module.css";
import { AiFillCloseCircle } from "react-icons/ai";


const CommentBox = ({ onClose, professionalId }) => {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  const usersLocal = useSelector((state) => state.usersLogin.user);
  const usersGoogle = useSelector((state) => state.googleLogin.user);
  const comments = useSelector((state) => state.comment.comments);
  const [newComment, setNewComment] = useState("");
  const [userDataOk, setUserDataOk] = useState("");
  const [rating, setRating] = useState(0);
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [popUpComment, setPopUpComment] = useState(false)
  const [commentSuccessPopUp, setCommentSuccessPopUp] = useState(false);

  const handleChange = (newRating) => {
    setRating(newRating);
    
  };

  const handleComment = () => {
    if (newComment.trim() !== "") {
      const commentData = {
        comment: newComment,
        client: usersGoogle?.userName || usersLocal.userName,
        professionalId: detail.detail.creator[0]._id,
        rating: rating,
      };
      dispatch(postComment(commentData))
        .then((data) => {
          if (data.meta.requestStatus === 'fulfilled') {
            setNewComment("");
            setRating(0);
            setIsCommentBoxOpen(false);
            setCommentSuccessPopUp(true);
          }else {
            setPopUpComment(true)
          }
        })
        .catch((error) => {
          console.error("Error al enviar comentario:", error);
          // Manejar el error según sea necesario
        });
    }
  };

  const handlerClosePopUpComments = () => {
    setPopUpComment(false);
  setCommentSuccessPopUp(false); 
  setNewComment("");
  setRating(0);
    
  }

  return (
    <div>
  
       <div className={style.myCustomBox}>
  <div className={style.closeIcon}>
    <AiFillCloseCircle onClick={onClose} />
  </div>
 
  
            <h3 className={style.h3}>
              Agregar comentario
            </h3>
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
            {isCommentBoxOpen &&
            <button onClick={onClose} className={style.button}>
              X
            </button>}
            <button onClick={handleComment} className={style.button}>
              Enviar
            </button>
            
        
        </div>
      
      {
        popUpComment &&
        <div className={style.containerPopUpComments}>
          <div className={style.popUpComments}>
          <AiFillCloseCircle
            className={style.btnCerrarComments}
            onClick={handlerClosePopUpComments}
          />
          <h3>Ya dejaste un comentario</h3>
          </div>
        </div>
      }
      {commentSuccessPopUp && (
      <div className={style.containerPopUpSuccess}>
        <div className={style.popUpSuccess}>
          <AiFillCloseCircle
            className={style.btnCerrarComments}
            onClick={() => setCommentSuccessPopUp(false)}
          />
          <h3>¡Comentario enviado con éxito!</h3>
        </div>
      </div>
    )}
    </div>
  );
};


export default CommentBox;

