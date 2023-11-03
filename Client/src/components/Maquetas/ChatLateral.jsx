import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  IconButton,
  Button,
  TextField,
  Grid,
} from '@mui/material';

const ChatComponent = ({ chatMessages, message, setMessage, handleSendMessage, userAvatar, userName }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ margin: '10px', border: '1px solid #ccc', borderRadius: 5, padding: 1, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Chat
            </Typography>
            <div style={{ height: '300px', overflowY: 'auto' }}>
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={msg.sentByUser ? userAvatar : msg.senderAvatar} alt={msg.sentByUser ? userName : msg.senderName} />
                    <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                      {msg.sentByUser ? userName : msg.senderName}
                    </Typography>
                  </div>
                  <div style={{ textAlign: msg.sentByUser ? 'right' : 'left' }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <TextField
              fullWidth
              placeholder="Escribe un mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              style={{ marginTop: '16px' }}
            >
              Enviar
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChatComponent;
