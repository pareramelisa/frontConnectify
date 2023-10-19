import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
// import logoName from './logoName.png'

const iconStyles = {
  fontSize: '2rem', 
}

const buttonStyles = {
  marginRight: '15px',
}

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box sx={{ marginLeft: "auto" }}>
            <Button variant="contained" sx={buttonStyles}>Connect</Button>
            <Button variant="contained" sx={buttonStyles}>Provide your service</Button>
          </Box>
          <IconButton color="inherit" sx={iconStyles}>
            <HelpIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}