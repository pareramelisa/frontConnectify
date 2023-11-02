import * as React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import HideSourceIcon from '@mui/icons-material/HideSource';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { ListSubheader, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';

function AdsProfesional() {
  const users = useSelector(state => state.usersLogin.user)
  const ads = useSelector(state => state.ads.ads)
  const userId = users._id
  const adsFilter = ads.filter((ad) => ad.creator[0] === userId)
  
  return (
    <List
      sx={{
        marginRight: "80px",
        width: "800px",
        bgcolor: "lightGrey",
        boxShadow: 20,
        padding: "20px",
        height: "auto",
        marginTop: "30px",
      }}
    >
      <ListSubheader sx={{ fontSize: "25px", color: "black", padding: "5px" }}>
        <span style={{ display: "flex", alignItems: "center" }}>
        <LocalLibraryOutlinedIcon sx={{ marginRight: 1 }} fontSize="medium"  />
            <Typography variant="body2" color="black" sx={{ fontSize: "25px" }}>
              Mis anuncios
            </Typography>
          <Link to="/professional/dashboardProf/createAds" style={{ marginLeft: "auto" }}>
            <IconButton aria-label="create">
              <AddIcon />
            </IconButton>
          </Link>
        </span>
      </ListSubheader >
      {adsFilter.map((value) => (
        <ListItem
          key={value}
          sx={{ padding: "15px"}}
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
        >
          <Typography variant="body2" color="black" sx={{ fontSize: "15px" }}>
          {`Nombre del anuncio ${value}`}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}

export default AdsProfesional