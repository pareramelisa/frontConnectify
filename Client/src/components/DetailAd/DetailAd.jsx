import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";

import React from "react";
import { useParams } from "react-router-dom";
export const DetailAd = () => {
  //* const { id } = useParams();
  const theme = createTheme({
    palette: {
      primary: { main: "#3B7BA4" },
      secondary: { main: "#56C7BA" },
      deepBlack: { main: "#24272B" },
      lightGrey: { main: "#545454" },
      error: { main: "#FF495C" },
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
      subtitle1: {
        fontSize: 12,
      },
      body1: {
        fontWeight: 500,
      },
      button: {
        fontStyle: "bold",
      },
    },
  });
  return (
    <>
      {" "}
      <ThemeProvider theme={theme} sx={{ fontFamily: "Poppins, sans-serif" }}>
        <Grid container spacing={2}>
          <Grid item xs={8} align="left">
            <Grid xs={4} sx={{ marginLeft: 3 }}>
              <Button sx={{ marginRight: 0.5 }} variant="contained">
                Rubro
              </Button>
              <Button variant="contained">Rubro 2</Button>
            </Grid>
            <Container sx={{ width: 800 }}>
              <Typography fontWeight="900" variant="h2" gutterBottom>
                Profesional con 20 años de experiencia en su rubro
              </Typography>
              <Typography fontWeight="900" variant="h5" gutterBottom>
                Ubicación:
              </Typography>
              <Typography variant="h6" gutterBottom>
                Ciudad Autónoma de Buenos Aires
              </Typography>
              <Typography fontWeight="900" variant="h4" gutterBottom>
                Acerca de -nombre-
              </Typography>
              <Typography fontWeight="700" gutterBottom variant="body1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus laboriosam soluta cumque quae repellat? Sit,
                consequatur aperiam. Earum atque minima, recusandae dignissimos
                provident modi molestiae. Ipsam eius numquam officia similique?
                Assumenda eius in non mollitia neque consequuntur, odit repellat
                perspiciatis iusto tenetur id, pariatur cupiditate! Autem,
                aliquid natus delectus corporis deserunt possimus in omnis
                obcaecati mollitia tempore culpa doloribus iusto!
              </Typography>
            </Container>

            <Grid item xs={4}>
              <Card
                sx={({ width: 800 }, { backgroundColor: "grey" })}
                align="left"
                gutterBottom
              >
                <CardContent>
                  <Typography variant="h6">reseña uno</Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti, fuga, a inventore praesentium tenetur obcaecati
                    tempore eaque doloremque corporis reprehenderit aliquam
                    accusamus earum odio facilis, vitae molestiae maxime sed
                    consequuntur.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Card sx={({ maxWidth: 345 }, { borderRadius: 5 })}>
              <CardMedia
                sx={{ height: 200 }}
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography fontWeight="900" variant="h5" component="div">
                  Don Iguana
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <div>
                      <List>
                        <ListItem>
                          <Typography align="left">Tarifa consulta:</Typography>
                          <Typography align="right">$$$</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>Modalidad</Typography>
                        </ListItem>
                      </List>
                    </div>
                  </Grid>
                </Grid>
                <Button
                  color="secondary"
                  sx={({ maxWidth: 100 }, { paddingX: 10 })}
                >
                  Contactar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>{" "}
      </ThemeProvider>
    </>
  );
};
