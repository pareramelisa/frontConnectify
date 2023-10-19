import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid } from '@mui/material';

const footerStyles = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '1rem',
    textAlign: 'center',
  };

export const Footer = () => {
  return (
    <AppBar position="static" color="primary" style={footerStyles}>
      <Toolbar>
        <Container>
          <Typography variant="body1" style={{ color: '#fff' }}>
            © 2023 Connectify. All rights reserved.
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};


