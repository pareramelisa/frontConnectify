import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListSubheader } from '@mui/material';

function BookingProf() {

  return (
    <List
      sx={{ width: "600px", fontSize: "30px", boxShadow: 20, padding: "30px", height: "auto", marginTop: "20px"}}>
        <ListSubheader sx={{ fontSize: '30px', color: 'black' }}>
        <span style={{ display: 'flex', alignItems: 'center' }}>
         Mis reservas
        </span>
      </ListSubheader>
      {[1, 2, 3].map((value) => (
        <ListItem
          key={value}
          disableGutters
        >
          <ListItemText primary={`Nombre del que reserva ${value} | Numero de contacto`}/>
        </ListItem>
      ))}
    </List>
  );
}

export default BookingProf