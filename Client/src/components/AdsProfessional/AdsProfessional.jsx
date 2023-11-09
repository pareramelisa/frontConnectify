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
import { useSelector, useDispatch } from 'react-redux';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { deleteAd } from '../../redux/Slices/adsDeleteSlice';

function AdsProfesional() {

  const dispatch = useDispatch()

  const handleDisable = (id) => {
    dispatch(deleteAd(id));
  };

  const users = useSelector(state => state.usersLogin.user)
  const ads = useSelector(state => state.createAds.createAds)
  const userId = users._id
  const adsFilter = ads.filter((ad) => ad.creator[0] === userId)
  console.log(adsFilter)

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
      {adsFilter.map((ad) => (
        <ListItem
          key={ad.id}
          sx={{ padding: "15px"}}
          disableGutters
          secondaryAction={
            <>
              <IconButton aria-label="comment"
              onClick={() => handleDisable(ad._id)}>
                <HideSourceIcon />
              </IconButton>
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
            </>
          }
        >
          <Typography variant="body2" color="black" sx={{ fontSize: "15px" }}>
          {`${ad.title}`}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}

export default AdsProfesional