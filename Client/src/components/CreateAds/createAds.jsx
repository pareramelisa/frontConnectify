import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAd } from "../../redux/Slices/createAdsSlice";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, Divider, Grid, InputLabel, Paper } from "@mui/material";
import NavBar from "../../components/Navbar/Navbar"
import Footer from "../Footer/Footer";

function CreateAdForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.usersLogin.user);

  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("formData");
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          title: "",
          description: "",
          location: "",
          price: "",
          categories: "",
          contractType: "",
          workLocation: "",
          profession: "",
        };
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const isFormFilled = Object.values(formData).every(value => value !== '');

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (fieldName, value) => {
    if (fieldName !== 'price' && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s,.\-]*$/.test(value)) {
      return;
    }
  
    if (fieldName === 'price' && (value === '' || parseInt(value) < 1)) {
      return;
    }
  
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userinput = {
      ...formData,
      creator: user._id,
      price: Number(formData.price),
    }

    try {
      await dispatch(createAd(userinput));
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000); // Ocultar el mensaje después de 3 segundos
    } catch (error) {
      console.error("Error al crear el anuncio:", error);
    }
  } 

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <h1
        style={{
          marginLeft: "115px",
          fontSize: "30px",
          marginBottom: "20px",
          fontFamily: "Roboto, sans-serif",
          fontWeight: 300,
        }}
      >
        Crea tu anuncio
      </h1>
      <Divider />
      <Grid
        container
        justifyContent="center"
        sx={{ paddingBottom: 25, paddingTop: 4 }}
      >
        <Grid item xs={10}>
          <Paper elevation={3} sx={{ padding: 10, boxShadow: 10 }}>
            <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={6} style={{ textAlign: "left" }}>
                  <TextField
                    label="Título"
                    variant="standard"
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
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
                    onChange={(e) => handleInputChange('location', e.target.value)}
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
                    onChange={(e) => handleInputChange('price', e.target.value)}
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
                    onChange={(e) => handleInputChange('categories', e.target.value)}
                    required
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  <InputLabel id="contractType">
                    Tipo de contratación
                  </InputLabel>
                  <Select
                    label="Tipo de contratación"
                    variant="standard"
                    name="contractType"
                    value={formData.contractType}
                    onChange={(e) => handleInputChange('contractType', e.target.value)}
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
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  <InputLabel id="workLocation">
                    Modalidad de trabajo:
                  </InputLabel>
                  <Select
                    label="Modalidad de trabajo"
                    variant="standard"
                    name="workLocation"
                    value={formData.workLocation}
                    onChange={(e) => handleInputChange('workLocation', e.target.value)}
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
                    onChange={(e) => handleInputChange('profession', e.target.value)}
                    required
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
              </Grid>
              <div style={{ paddingTop: "40px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!isFormFilled}
                >
                  Crear anuncio
                </Button>
                {isSuccess && (
                  <p style={{ color: "green", marginTop: "10px" }}>
                    El anuncio se ha creado con éxito.
                  </p>
                )}
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
