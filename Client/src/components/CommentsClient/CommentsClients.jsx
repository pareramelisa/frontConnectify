/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { Card, CardContent, Typography } from '@mui/material';
import { getComments } from '../../redux/Slices/commentSlice';

function CommentsClient({ id }) {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersLogin.user);
  const comments = useSelector((state) => state.comment.comments);
  const detail = useSelector((state) => state.detail);
  const [commentsForProfessional, setCommentsForProfessional] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userDataOk, setUserDataOk] = useState('');

  const professionalId = id;


  useEffect(() => {
    if (isAuthenticated) {
      setUserDataOk(user.nickname || users.userName);
    }
    dispatch(getComments());
  }, [user, users, isAuthenticated, dispatch]);

  // Filtra los comentarios solo para el profesional en cuestión
  useEffect(() => {
    const filteredComments = comments.filter(
      (comment) => comment.Professional._id === professionalId
    );
    setCommentsForProfessional(filteredComments);
  }, [comments, professionalId]);
 

  return (
    <div>
      {commentsForProfessional.length > 0 ? (
        commentsForProfessional.map((comment) => (
          <Card
            key={comment._id}
            sx={{
              width: '50%',
              backgroundColor: '#D9D9D9',
              padding: '1em',
              marginLeft:'5em',
              marginRight: '750px',
              opacity:'80%',
              marginBottom:'1em',
              marginTop:'1em',
            }}
            align="left"
          >
            <CardContent>
              <div className="profile-container">
                <div className="profile-text">
                  <Typography variant="h6">
                    {[...Array(comment.rating)].map((index) => (
                      <span key={index}>⭐</span>
                    ))}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '15px', fontWeight:'bold' }}>
                    {comment.comment}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card
          sx={{
            width: '50%',
            backgroundColor: '#D9D9D9',
            padding: '10px',
            marginLeft:'5em',
            marginRight: '750px',
            opacity:'80%',
            marginBottom:'1em',
            marginTop:'1em',
          }}
          align="left"
        >
          <CardContent>
            <div className="profile-container">
              <div className="profile-text">
                <Typography
                  variant="body2"
                  sx={{ fontSize: '15px', fontWeight: 'bold' }}
                >
                  El profesional aún no tiene comentarios.
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default CommentsClient;