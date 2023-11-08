import { debounce } from "lodash";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserRegister } from "../../redux/Slices/registerSlice";
import style from "./register.module.css";
import TextField from '@mui/material/TextField';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputLabel } from "@mui/material";
import * as validations from "./ValidationsRegister";
import NavBarDemo2 from '../NavBarDemo2/NavBarDemo2'
// import photo from "../../assets/register.png";
import Button from '@mui/material/Button';

const Registration = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    console.log(54545454);
  }, [clientRegister.remoteWork]);

  const routeLocation = useLocation();
  const ifProfRoute = routeLocation.pathname === "/professional/registration";
  const ifClientRoute = routeLocation.pathname === "/client/registration";

  const [passwordType, setPasswordType] = useState();
  const [remoteWork, setRemoteWork] = useState(false);
  const [formData, setFormData] = useState(new FormData());

  const renderPasswordToggle = () => (
    <button type="button" onClick={handleHidePassword}>
      {passwordType ? <Visibility style={{ fontSize: 18 }} /> : <VisibilityOff style={{ fontSize: 18 }}/>}
    </button>
  );
  const handleHidePassword = () => {
    setPasswordType(!passwordType);
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // Validación de correo electrónico
    errors.email = validations.validateEmail(clientRegister.email);

    // Validación de formato de imagen
    errors.image = validations.validateImageFormat(formData.get("image"));

    setErrorMessages(errors);

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
      console.log(response);
      if (response === "Successfully registered client.") {
        alert(response);
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
          alert(response);
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
    localStorage.setItem("clientRegisterData", JSON.stringify(clientRegister));
  }, [clientRegister]);

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    if (type === "checkbox") console.log(e.target.checked);
    console.log(name);

    console.log(e.target.checked);
    setRemoteWork(e.target.checked);
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
    console.log(clientRegister);
    console.log(formData);
  };
  console.log(remoteWork);

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
    console.log("Image file name: " + image.name);
    console.log("Image file size: " + image.size + " bytes");
    console.log("Image file type: " + image.type);
    const imageFile = formData.get("image");
    console.log(imageFile);
    console.log(formData.get("image"));
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
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '140vh',
      background: `url(${photo})`,
      backgroundPosition: 'right',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    }}>
      <NavBarDemo2/>
      
      <div style={{ columns: "1", columnGap: '1rem', padding: '0rem 8rem 6rem 12rem', justifyContent: 'center', alignItems: 'center', breakInside: 'avoid', width: 'min-content', backgroundColor: 'transparent' }}>
    
        <form onSubmit={(e) => handleSubmit(e)}>
          <div style={{ padding: '5px'}}>
            <InputLabel htmlFor="name">Nombre</InputLabel>
            <TextField
              type="text"
              name="name"
              value={clientRegister.name}
              onChange={handleChange}
              placeholder="Nombre"
              fullWidth
            />
          </div>
          <div style={{ padding: '5px'}}>
            <InputLabel htmlFor="lastName">Apellido</InputLabel>
            <TextField
              type="text"
              name="lastName"
              value={clientRegister.lastName}
              onChange={handleChange}
              placeholder="Apellido"
              fullWidth
            />
          </div>
          <div style={{ padding: '5px'}}>
            <InputLabel htmlFor="userName">Nombre de Usuario</InputLabel>
            <TextField
              type="text"
              name="userName"
              value={clientRegister.userName}
              onChange={handleChange}
              placeholder="Nombre de Usuario"
              fullWidth
            />
          </div>
          <div style={{ padding: '5px'}}>
            <InputLabel htmlFor="email">Email :</InputLabel>
            <TextField
              type="email"
              name="email"
              value={clientRegister.email}
              onChange={handleChange}
              placeholder="Email"
              fullWidth
            />
            {errorMessages.email && <div className="error">{errorMessages.email}</div>}
          </div>
          <div style={{ padding: '5px'}}>
            <InputLabel htmlFor="password">Contraseña: </InputLabel>
            <TextField
              type={passwordType ? "text" : "password"}
              value={clientRegister.password}
              name="password"
              onChange={handleChange}
              placeholder="Contraseña"
              fullWidth
            />
            {renderPasswordToggle()}
          </div>
          <div style={{ padding: '5px'}}>
            <h2>Dirección</h2>
            <InputLabel htmlFor="province">Provincia</InputLabel>
            <TextField
              type="text"
              name="province"
              value={clientRegister.province}
              onChange={handleChange}
              placeholder="Provincia"
              fullWidth
            />
            <div style={{ padding: '5px'}}></div>
            <InputLabel htmlFor="location">Localidad</InputLabel>
            <TextField
              type="text"
              name="location"
              value={clientRegister.location}
              onChange={handleChange}
              placeholder="Localidad"
              fullWidth
            />
          </div>
          {ifProfRoute && (
            <div style={{ backgroundColor: 'transparent'}}>
              <div>
                <h2>Area de trabajo</h2>
                <InputLabel htmlFor="provinceJob">Provincia</InputLabel>
                <TextField
                  type="text"
                  name="provinceJob"
                  value={clientRegister.provinceJob}
                  onChange={handleChange}
                  placeholder="Provincia"
                  fullWidth
                />
                <div style={{ padding: '5px'}}></div>
                <InputLabel htmlFor="locationJob">Localidad</InputLabel>
                <TextField
                  type="text"
                  name="locationJob"
                  value={clientRegister.locationJob}
                  onChange={handleChange}
                  placeholder="Localidad"
                  fullWidth
                />
              </div>
              <div style={{ padding: '5px'}}></div>
              <InputLabel htmlFor="profession">Profesión</InputLabel>
              <TextField
                type="text"
                name="profession"
                value={clientRegister.profession}
                onChange={handleChange}
                placeholder="profesión"
                fullWidth
              />
              <div style={{ padding: '5px'}}></div>
              <InputLabel htmlFor="description">Descripción</InputLabel>
              <TextField
                type="text"
                name="description"
                value={clientRegister.description}
                onChange={handleChange}
                placeholder="descripción"
                fullWidth
              />
              <div style={{ padding: '5px'}}></div>
              <InputLabel htmlFor="remoteWork">Trabajo Remoto</InputLabel>
              <TextField
                type="checkbox"
                name="remoteWork"
                value={remoteWork}
                onChange={handleChange}
              />
            </div>
          )}
          <div style={{ padding: '5px'}}></div>
          <InputLabel htmlFor="image">Imagen</InputLabel>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageUpload}
          />
          {errorMessages.image && <div style={{ color: "red" }}>{errorMessages.image}</div>}
          <div>
            <div style={{ padding: '10px'}}></div>
            {areAllProfFieldsCompleted() && ifProfRoute && (
              <Button variant="contained" color="secondary"
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
              <Button variant="contained" color="secondary"
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
        </form>
      </div>
    </div>
  );
};

export default Registration;
