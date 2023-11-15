import miApi from '../../../localidades.json';
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserRegister } from "../../redux/Slices/registerSlice";

import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputLabel , Box, Select,  MenuItem, FormControl} from "@mui/material";
import * as validations from "./ValidationsRegister";
import Navbar from '../Navbar/Navbar'

import Button from "@mui/material/Button";

const Registration = () => {
const navigate = useNavigate();
///localStorage.clear();
  const [errorMessages, setErrorMessages] = useState({});
  const [clientRegister, setClientRegister] = useState(() => {
    let localStorageData = localStorage.getItem("clientRegisterData");
    return localStorageData
      ? JSON.parse(localStorageData)
      : {
          name: "",
          lastName: "",
          userName: "",
          email: "",
          password: "",
          profession: [],
          description: "",
          province: "",
          location: "",
          provinceJob: "",
          locationJob: "",
          
        };
        
  });

  const updateUserName = () => {
    if (clientRegister.email) {
      const userName = clientRegister.email.split("@")[0];
      const currentDate = new Date();
      const dateString = currentDate.toISOString().substring(0, 10); // Obtén la fecha en formato "YYYY-MM-DD"
      const uniqueUserName = `${userName}${dateString}`.replace(/[^a-zA-Z0-9]/g, ''); // Elimina los caracteres especiales del string
      setClientRegister((prevState) => ({
        ...prevState,
        userName: uniqueUserName,
      }));
    }
  };


  useEffect(() => {
    updateUserName();
  }, [clientRegister.email]);

  useEffect(() => {
    localStorage.setItem("clientRegisterData", JSON.stringify(clientRegister));
    
  }, [clientRegister]);

  useEffect(() => {
    updateUserName();
    setClientRegister(prevState => ({ ...prevState, image: "" }));

  }, []);

  const routeLocation = useLocation();
  const ifProfRoute = routeLocation.pathname === "/professional/registration";
  const ifClientRoute = routeLocation.pathname === "/client/registration";

  const [passwordType, setPasswordType] = useState();
  const [remoteWork, setRemoteWork] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const [email, setEmail] = useState("")
  const [error, setError] = useState({
    error: false,
    message:""
  })

 

  function getProvinces(data) {
    const provinces = data.localidades.map((provincia) => { return provincia.provincia.nombre; });
    return [...new Set(provinces)];
  }

  const provincesList = getProvinces(miApi);
  

  const selectedProvParticular = clientRegister.province;
  //console.log('Provincia seleccionada:', selectedProvParticular);

  function selectCitiesByProvince(data, selectedProvince) {
    const cities = data.localidades.filter((ciudad) => {
      return ciudad.provincia.nombre === selectedProvince;
    });
    const sortedCities = [...new Set(cities)].sort((a, b) => a.nombre.localeCompare(b.nombre));
    return sortedCities;
  }

  const citiesInSelectedProvince = selectCitiesByProvince(miApi, selectedProvParticular);
  //console.log('Ciudades en la provincia seleccionada:', citiesInSelectedProvince);



  const renderPasswordToggle = () => (
    <Button type="button" onClick={handleHidePassword}>
      {passwordType ? (
        <Visibility style={{ fontSize: 18 }} />
      ) : (
        <VisibilityOff style={{ fontSize: 18 }} />
      )}
    </Button>
  );
  const handleHidePassword = () => {
    setPasswordType(!passwordType);
  };

  function validateEmail(email) {
  
    if (email.includes(",") || email.includes("+")) {
      setError({
        error: true,
        message: "El correo electrónico no puede contener los caracteres ',' o '+'",
      });
      return false;
    }

  
    // Verificar la validez del formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    if (!emailRegex.test(email)) {
      setError({
        error: true,
        message: "Correo electrónico no válido.",
      });
      return false;
    }
  
   
    setError({ error: false, message: "", });
  
    // Actualizar el estado del campo "email"
    setEmail(email);
  
    return true;
  }
  
  
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    // Validación de formato de imagen
    errors.image = validations.validateImageFormat(formData.get("image"));
    
    // Validación del correo electrónico
    if (validateEmail(clientRegister.email)) {
      errors.mail = null; // Correo electrónico válido
    } else {
      // El correo electrónico es inválido, muestra un mensaje de error
      errors.mail = "Email no valido, no puede contener caracteres especiales y debe estar completo.";
      setError({
        error: true,
        message: errors.mail,
      });
    }
    
    setErrorMessages(errors);
    
    // Si hay un error en el correo electrónico o en la imagen, muestra un mensaje de alerta
    if (errors.mail !== null || errors.image !== null) {
      alert("Hay errores en el formulario. Por favor, revisa los campos e intenta de nuevo.");
    } else {
      setError({
        error: false,
        message: "",
      });
    }
    
    // console.log("clientRegister:", clientRegister);
    // console.log("remoteWork:", remoteWork);

    if (Object.values(errors).some((error) => error !== null)) {
      return;
    }
    formData.set("name", clientRegister.name);
    formData.set("lastName", clientRegister.lastName);
    formData.set("userName", clientRegister.userName);
    formData.set("email", clientRegister.email);
    formData.set("province", clientRegister.province);
    formData.set("location", clientRegister.location);
    formData.set("password", clientRegister.password);
    formData.set("profession", clientRegister.profession);
    formData.set("description", clientRegister.description);
    formData.set("locationJob", clientRegister.locationJob);
    formData.set("provinceJob", clientRegister.provinceJob);
    formData.set("remoteWork", remoteWork);

    
    if (clientRegister.profession.length === 0) {
      const response = await dispatch(fetchUserRegister(formData, "client"));
      if (response === "Successfully registered client.") {
        alert("Se ha registrado exitosamente. Ahora podrá hacer su ingreso en el Login con su email y contraseña");
        localStorage.removeItem("clientRegisterData");
        navigate("/home");
      } else {
        if (response) {
          alert(response);
        } else {
          alert("Vuelva a intentarlo más tarde");
        }
      }
    } else {
      if (clientRegister.profession !== "") {
        const response = await dispatch(
          fetchUserRegister(formData, "professional")
        );
        if (response === "Profesional registrado exitosamente") {
          alert("Se ha registrado exitosamente. Ahora podrá hacer su ingreso en el Login con su email y contraseña");
          localStorage.removeItem("clientRegisterData");
          navigate("/home");
        } else {
          if (response) {
            alert(response);
          } else {
            alert("Ocurrió un error durante su registración");
          }
        }
      }
    }

  };



  useEffect(() => {
    if (clientRegister.province) {
      

      // Obtén las ciudades de la provincia desde el API
      const citiesInSelectedProvince = selectCitiesByProvince(miApi, clientRegister.province);
      
  
      const defaultLocation = citiesInSelectedProvince.length > 0
        ? { nombre: "Elija una ciudad de la provincia seleccionada", value: "" }
        : { nombre: "Elija una ciudad de la provincia seleccionada", value: "" };
  
      // Guarda el valor predeterminado en localStorage
      localStorage.setItem('location', defaultLocation.value);
  
      // Actualiza el estado con las ciudades y la opción predeterminada
      setClientRegister(prevState => ({
        ...prevState,
        location: clientRegister.location,
        provinceJob: prevState.province, // Establece provinceJob al mismo valor que province
      }));
    }
  }, [clientRegister.province]);
  

  const handleChange = (e) => {
    const { name, type, value } = e.target;

    if (name === "email") {
      // Verificar si el valor contiene el carácter "+"
      if (value.includes("+"))  {
        setError({
          error: true,
          message: "El correo electrónico no puede contener el carácter '+'",
        });
      } else if (value.includes(",")) {
        setError({
          error: true,
          message: "El correo electrónico no puede contener comas.",
        });
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        setError({
          error: true,
          message: "Completar su correo hasta obtener un formato válido.",
        });
      } else { 
        setError({ 
          error: false,  
          message: "", 
        });
      }

      // Actualizar el estado del campo "email"
      setEmail(value);
    }
    
    if (type === "checkbox") setRemoteWork(e.target.checked);
    

    const nameArray = name.split(".");

    if (nameArray.length === 2) {
      const [outer, inner] = nameArray;
      setClientRegister({
        ...clientRegister,
        [outer]: {
          ...clientRegister[outer],
          [inner]: value,
        },
      });
    } else {
      setClientRegister({ ...clientRegister, [name]: value });
    }


    if (name === 'location') {
      setClientRegister((prevState) => ({
        ...prevState,
        
        ...prevState,
       
  locationJob: value,
  location: value, 
      }));
    }

    // Validación específica para "name" y "Apellido"
  if ((name === 'name') || (name === 'lastName' )) {
    // Transformar la primera letra a mayúscula
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    // Validar que solo haya una palabra
    const isOneWord = /^[^\s]+$/.test(capitalizedValue);

    if (isOneWord) {
      setClientRegister((prevState) => ({
        ...prevState,
        [name]: capitalizedValue,
      }));
    } 
  }
  };

  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    setErrorMessages((prevErrors) => ({ ...prevErrors, image: null }));

    if (image) {
      formData.set("image", image);
      setClientRegister({
        ...clientRegister,
        image: URL.createObjectURL(image),
      });
    }

    const imageFile = formData.get("image");

    const imgElement = document.createElement("img");
    imgElement.src = URL.createObjectURL(image);

    
  };

  const areAllProfFieldsCompleted = () => {
    const {
      name,
      lastName,
      userName,
      email,
      password,
      province,
      provinceJob,
      location,
      locationJob,
      profession,
      description,
      //remoteWork,
      image,
    } = clientRegister;

    return (
      name &&
      lastName &&
      userName &&
      email &&
      password &&
      province &&
      location &&
      provinceJob &&
      locationJob &&
      profession &&
      description &&
      
      image
    );
  };
  const areAllClienFieldsCompleted = () => {
    const {
      name,
      lastName,
      userName,
      email,
      password,
      image,
      province,
      location,
    } = clientRegister;

    return (
      name &&
      lastName &&
      userName &&
      email &&
      password &&
      province &&
      location &&
      image
    );
  };

  return (
    <div>
      <Navbar />

      <div
        style={{
          padding: "2rem 8rem ",
          justifyContent: "center",
          alignItems: "center",
          width: "800px",
          backgroundColor: "transparent",
        }}
      >
        <h2>Registrate </h2>
        <Box component="form" onSubmit={(e) => handleSubmit(e)}>
          <div style={{ padding: "5px" }}>
            
            <TextField
            id="name"
            label="Nombre"
              type="text"
              name="name"
              value={clientRegister.name}
              onChange={handleChange}
              placeholder="Nombre"
              fullWidth
              required
            />
          </div>
          <div style={{ padding: "5px" }}>
            <TextField
            id="Apellido"
            label="Apellido"
              type="text"
              name="lastName"
              value={clientRegister.lastName}
              onChange={handleChange}
              placeholder="Apellido"
              fullWidth
              required
            />
          </div>
          
          <div style={{ padding: "5px" }}>
            <TextField
            id="email"
            label="Email"
              type="text"
              name="email"
              value={clientRegister.email}
              onChange={handleChange}
              placeholder="Email"
              fullWidth
              required
              helperText= {error.message}
              error={error.error}
              autoComplete="off"
            />
            
          </div>
          <div style={{ padding: "5px" }}>
            
            <TextField
            id="contraseña"
            label="Contraseña"
              type={passwordType ? "text" : "password"}
              value={clientRegister.password}
              name="password"
              onChange={handleChange}
              placeholder="Contraseña"
              fullWidth
              required
              autoComplete="off"
            />
            {renderPasswordToggle()}
          </div>
          <div style={{ padding: "5px" }}>
            <h3>Ubicación dentro de Argentina</h3>
            <h4>Provincia*</h4>
            <FormControl fullWidth required>
            <Select        
              type="text"
              name="province"
              value={clientRegister.province}
              onChange={handleChange}
              default="Provincia"
              fullWidth
              required
            >
               <MenuItem value="filterProvinciasParticular">Elija Provincia</MenuItem>
              {provincesList.map((province) => (
          <MenuItem key={province} value={province}>
            {province}
          </MenuItem>
        ))}
        </Select>
        </FormControl>
 
  <h4>Ciudad*</h4>
  <FormControl fullWidth required>
    
    <Select
      labelId="location-label"
      id="location"
      name="location"
      value={clientRegister.location}
      onChange={handleChange}
      fullWidth
      required
    >
       <MenuItem key="default" value={ clientRegister.location}>
          Elija una cuidad de la provincia seleccionada
        </MenuItem>
      {[citiesInSelectedProvince.map((city, index) => (
          <MenuItem key={index} value={city.nombre}>
            {city.nombre}
          </MenuItem>
        ))
      ]}
     
    </Select>
  </FormControl>
          </div>
          {ifProfRoute && (
            <div style={{ backgroundColor: "transparent" }}>
              <div>
                <h2>Oferta de servicios</h2>
                
              </div>
             
              
              <TextField
              label="Profesión u oficio."
                type="text"
                name="profession"
                value={clientRegister.profession}
                onChange={handleChange}
                placeholder="profesión u oficio."
                fullWidth
                required
              />
              <div style={{ padding: "5px" }}></div>
              
              <TextField
              label="Biografia descriptiva"
                type="text"
                name="description"
                value={clientRegister.description}
                onChange={handleChange}
                placeholder="Comparte tus habilidades con la comunidad de Connectify"
                fullWidth
                required                
              />
              {/* <div style={{ padding: "5px" }}>
              <label htmlFor="remoteWork">Trabajo Remoto</label>
            <input
              type="checkbox"
              // id="myCheckbox"
              name="remoteWork"
              value={remoteWork}
              onChange={handleChange}
            />
          </div> */}
                            
            </div>
          )}
          <div style={{ padding: "5px" }}></div>
          <InputLabel htmlFor="image">Imagen</InputLabel>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageUpload}
            style={{ width: "100%", height: "50px", fontSize: "18px" }}
          />
          {clientRegister.image && (
          <img
            src={clientRegister.image}
            alt="Uploaded Image"
            style={{ maxWidth: "100px" }}
          />
        )}
          {errorMessages.image && (
            <div style={{ color: "red" }}>{errorMessages.image}</div>
          )}
                    {(!areAllProfFieldsCompleted() && ifProfRoute) || (!areAllClienFieldsCompleted() && ifClientRoute) ? (
                      <p style={{ color: "red" }}>Completá todos los campos sin errores para poder enviar este formulario</p>
                    ) : (
                      <div>
                        <div style={{ padding: "10px" }}></div>
                        {areAllProfFieldsCompleted() && ifProfRoute && (
                          <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            style={{
                              width: "100%",
                              paddingInline: "35px",
                              paddingBlock: "10px",
                              marginBottom: "20px",
                            }}
                          >
                            Enviar formulario
                          </Button>
                        )}
                        {areAllClienFieldsCompleted() && ifClientRoute && (
                          <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            style={{
                              width: "100%",
                              paddingInline: "35px",
                              paddingBlock: "10px",
                              marginBottom: "20px",
                            }}
                           >
                            Enviar formulario
                          </Button>
                        )}
                      </div>
                    )}
                  </Box>
                </div>
              </div>
            );
          };

export default Registration;

