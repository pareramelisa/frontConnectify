/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getComments, postComment } from "../../redux/Slices/commentSlice";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Rating from "react-rating-stars-component";
import style from "./Comments.module.css";

const CommentBox = ({ onClose, professionalId }) => {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  const users = useSelector((state) => state.usersLogin.user);
  const comments = useSelector((state) => state.comment.comments);
  const [newComment, setNewComment] = useState("");
  const [userDataOk, setUserDataOk] = useState("");
  const [rating, setRating] = useState(0);
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);

  const handleChange = (newRating) => {
    setRating(newRating);
  };


  const handleComment = () => {
    if (newComment.trim() !== "") {
      const commentData = {
        comment: newComment,
        client: users.userName,
        professionalId: detail.detail.creator[0]._id,
        rating: rating,
      };
      dispatch(postComment(commentData));
      setNewComment("");
      setRating(0);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
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
              marginRight: "10em",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={onClose}>X</button>
            </div>
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
            {isCommentBoxOpen &&
            <button onClick={onClose} className={style.button}>
              X
            </button>}
            <button onClick={handleComment} className={style.button}>
              Enviar
            </button>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default CommentBox;
