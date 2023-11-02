import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAd } from "../../redux/Slices/createAdsSlice";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, Divider, Grid, InputLabel, Paper } from "@mui/material";
import NavBar from "../../components/Navbar/Navbar";
import Footer from "../Footer/Footer";

function CreateAdForm() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.usersLogin.user)
  
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("formData");
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          title: "",
          description: "",
          location: "",
          price: "",
          categories: [],
          contractType: "",
          workLocation: "",
          profession: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = (e) => {
    const userinput = {
      ...formData, 
      creator: [user._id]
    }
    console.log(userinput)
    e.preventDefault();
    dispatch(createAd(userinput));
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <h1 style={{ marginLeft: "115px", fontSize: "30px", marginBottom: "20px", fontFamily: "Roboto, sans-serif", fontWeight: 300 }}>Crea tu anuncio</h1>
      <Divider />
      <Grid container justifyContent="center" sx={{ paddingBottom: 25, paddingTop: 4 }}>
        <Grid item xs={10}>
          <Paper
            elevation={3}
            sx={{ padding: 10, boxShadow: 10 }}
          >
            <form style={{ textAlign: "center" }}>
              <Grid container spacing={5}>
                <Grid item xs={6} style={{ textAlign: "left" }}>
                  <TextField
                    label="Título"
                    variant="standard"
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Locación"
                    variant="standard"
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Precio"
                    variant="standard"
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Categorías"
                    variant="standard"
                    type="text"
                    id="categories"
                    name="categories"
                    value={formData.categories}
                    onChange={(e) =>
                      setFormData({ ...formData, categories: e.target.value })
                    }
                    required
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  <InputLabel id="contractType">Tipo de contratación</InputLabel>
                  <Select
                    label="Tipo de contratación"
                    variant="standard"
                    name="contractType"
                    value={formData.contractType}
                    onChange={(e) =>
                      setFormData({ ...formData, contractType: e.target.value })
                    }
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  >
                    <MenuItem value="Full-time">Full-time</MenuItem>
                    <MenuItem value="Part-time">Part-time</MenuItem>
                    <MenuItem value="Freelance">Freelance</MenuItem>
                    <MenuItem value="Other">Otro</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6} style={{ textAlign: "left" }}>
                  <TextField
                    label="Descripción"
                    variant="standard"
                    multiline
                    rows={3}
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  <InputLabel id="workLocation">Modalidad de trabajo:</InputLabel>
                  <Select
                    label="Modalidad de trabajo"
                    variant="standard"
                    name="workLocation"
                    value={formData.workLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, workLocation: e.target.value })
                    }
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  >
                    <MenuItem value="Presencial">Presencial</MenuItem>
                    <MenuItem value="Remoto">Remoto</MenuItem>
                  </Select>
                  <TextField
                    label="Profesion"
                    variant="standard"
                    type="text"
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={(e) =>
                      setFormData({ ...formData, profession: e.target.value })
                    }
                    required
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
              </Grid>
              <div style={{ paddingTop: "40px" }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Crear anuncio
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default CreateAdForm;

