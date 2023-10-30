import { debounce } from "lodash";
import React, { useState, useEffect } from "react";
// import { useLocation, useHistory } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchUserRegister } from "../../redux/Slices/registerSlice";
import style from "./register.module.css";
import TextField from '@mui/material/TextField';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputLabel } from "@mui/material";

const Registration = () => {
  const navigate = useNavigate();
  // localStorage.clear();
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
          // confirmPassword: "",
          profession: [],
          description: "",
          // image: "",
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

  // const [province, setProvince] = useState(clientRegister.address.province);
  // const [location, setLocation] = useState(clientRegister.address.location);
  //a ajustar en funcion de cómo venga la API de provincias y localidades...

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.set("name", clientRegister.name);
    console.log(formData.get("image"));
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

  // const debouncedLocalStorageUpdate = debounce((data) => {
  //   localStorage.setItem("clientRegisterData", JSON.stringify(data));
  // }, 1000);
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
  // debouncedLocalStorageUpdate(clientRegister);
  // };

  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    if (image) {
      formData.set("image", image); //lo mete en el formData para el register de profs
      setClientRegister({
        ...clientRegister,
        image: URL.createObjectURL(image), //lo URLiza para el register de client
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
    <div style={{ columns: "1", columnGap: '.5rem', padding: '10rem', justifyContent: 'center', alignItems: 'center', breakInside: 'avoid', width: 'min-content' }}>
      <form onSubmit={(e) => handleSubmit(e)}>
      <div style={{ padding: '5px'}}>
        <InputLabel htmlFor="name">Nombre</InputLabel>
        <input
          type="text"
          name="name"
          value={clientRegister.name}
          onChange={handleChange}
          placeholder="Nombre"
        />
         </div>
         <div style={{ padding: '5px'}}>
        <InputLabel htmlFor="lastName">Apellido</InputLabel>
        <input
          type="text"
          name="lastName"
          value={clientRegister.lastName}
          onChange={handleChange}
          placeholder="Apellido"
        />
        </div>
        <div style={{ padding: '5px'}}>
        <InputLabel htmlFor="userName">Nombre de Usuario</InputLabel>
        <input
          type="text"
          name="userName"
          value={clientRegister.userName}
          onChange={handleChange}
          placeholder="Nombre de Usuario"
        />
        </div>
        <div style={{ padding: '5px'}}>
        <InputLabel htmlFor="email">Email :</InputLabel>
        <input
          type="email"
          name="email"
          value={clientRegister.email}
          onChange={handleChange}
          placeholder="Email"
        />
        </div>
        <div style={{ padding: '5px'}}>
          <InputLabel htmlFor="password">Contraseña: </InputLabel>
          <input
            type={passwordType ? "text" : "password"}
            value={clientRegister.password}
            name="password"
            onChange={handleChange}
            placeholder="Contraseña"
          />
          {renderPasswordToggle()}
        </div>
        <div style={{ padding: '5px'}}>
          <h2>Dirección</h2>
          <InputLabel htmlFor="province">Provincia</InputLabel>
          <input
            type="text"
            name="province"
            value={clientRegister.province}
            onChange={handleChange}
            placeholder="Provincia"
          />
          <div style={{ padding: '5px'}}></div>
          <InputLabel htmlFor="location">Localidad</InputLabel> 
          <input
            type="text"
            name="location"
            value={clientRegister.location}
            onChange={handleChange}
            placeholder="Localidad"
          />
        </div>
        {ifProfRoute && (
          <div>
            <div>
              <h2>Area de trabajo</h2>
              <InputLabel htmlFor="provinceJob">Provincia</InputLabel>
              <input
                type="text"
                name="provinceJob"
                value={clientRegister.provinceJob}
                onChange={handleChange}
                placeholder="Provincia"
              />
              <div style={{ padding: '5px'}}></div>
              <InputLabel htmlFor="locationJob">Localidad</InputLabel>
              <input
                type="text"
                name="locationJob"
                value={clientRegister.locationJob}
                onChange={handleChange}
                placeholder="Localidad"
              />
            </div>
            <div style={{ padding: '5px'}}></div>
            <InputLabel htmlFor="profession">Profesión</InputLabel>
            <input
              type="text"
              name="profession"
              value={clientRegister.profession}
              onChange={handleChange}
              placeholder="profesión"
            />
            <div style={{ padding: '5px'}}></div>
            <InputLabel htmlFor="description">Descripción</InputLabel>
            <input
              type="text"
              name="description"
              value={clientRegister.description}
              onChange={handleChange}
              placeholder="descripción"
            />
            <div style={{ padding: '5px'}}></div>
            <InputLabel htmlFor="remoteWork">Trabajo Remoto</InputLabel>
            <input
              type="checkbox"
              // id="myCheckbox"
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
        {clientRegister.image && (
          <img
            src={clientRegister.image}
            alt="Uploaded Image"
            style={{ maxWidth: "100px" }}
          />
        )}
        <div>
          {areAllProfFieldsCompleted() && (
            <button
              type="submit"
              style={{
                width: "100%",
                paddingInline: "35px",
                paddingBlock: "10px",
                marginBottom: "20px",
              }}
            >
              Enviar formulario
            </button>
          )}
          {areAllClienFieldsCompleted() && ifClientRoute && (
            <button
              type="submit"
              style={{
                width: "100%",
                paddingInline: "35px",
                paddingBlock: "10px",
                marginBottom: "20px",
              }}
            >
              Enviar formulario
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Registration;
