import * as React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import HideSourceIcon from '@mui/icons-material/HideSource';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { ListSubheader } from '@mui/material';
import { useSelector } from 'react-redux';

function AdsProfesional() {
  const users = useSelector(state => state.usersLogin.user)
  const ads = useSelector(state => state.ads.ads)
  const userId = users._id
  const adsFilter = ads.filter((ad) => ad.creator[0] === userId)
  
    const listItemStyle = { fontSize: '20px' }
  return (
    <List
      sx={{
        width: "600px",
        bgcolor: "lightGrey",
        fontSize: "30px",
        boxShadow: 20,
        padding: "30px",
        height: "auto",
        marginTop: "20px",
      }}
    >
      <ListSubheader sx={{ fontSize: "30px", color: "black" }}>
        <span style={{ display: "flex", alignItems: "center" }}>
          Mis anuncios
          <Link to="/professional/dashboardProf/createAds" style={{ marginLeft: "auto" }}>
            <IconButton aria-label="create">
              <AddIcon />
            </IconButton>
          </Link>
        </span>
      </ListSubheader>
      {adsFilter.map((value) => (
        <ListItem
          key={value}
          disableGutters
          secondaryAction={
            <>
              <IconButton aria-label="comment">
                <HideSourceIcon />
              </IconButton>
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
            </>
          }
          sx={listItemStyle}
        >
          <ListItemText
            primary={`Nombre del anuncio ${value}`}
            sx={listItemStyle}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default AdsProfesional