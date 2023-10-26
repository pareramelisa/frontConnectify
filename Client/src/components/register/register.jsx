import { debounce } from "lodash";
import React, { useState, useEffect } from "react";
// import { useLocation, useHistory } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchUserRegister } from "../../redux/Slices/registerSlice";
import style from "./register.module.css";

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
      {passwordType ? "Hide" : "Show"}
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
    formData.set("remoteWork", remoteWork);

    if (clientRegister.profession.length === 0) {
      const response = await dispatch(fetchUserRegister(formData, "client"));
      console.log(response);
      if (response === "Successfully registered client.") {
        alert(response);
        localStorage.removeItem("clientRegisterData");
        navigate("/login");
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
          navigate("/login");
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
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          value={clientRegister.name}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <label htmlFor="lastName">Apellido</label>
        <input
          type="text"
          name="lastName"
          value={clientRegister.lastName}
          onChange={handleChange}
          placeholder="Apellido"
        />
        <label htmlFor="userName">Nombre de Usuario</label>
        <input
          type="text"
          name="userName"
          value={clientRegister.userName}
          onChange={handleChange}
          placeholder="Nombre de Usuario"
        />
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          name="email"
          value={clientRegister.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <div>
          <label htmlFor="password">Contraseña: </label>
          <input
            type={passwordType ? "text" : "password"}
            value={clientRegister.password}
            name="password"
            onChange={handleChange}
            placeholder="Contraseña"
          />
          {renderPasswordToggle()}
        </div>
        <div>
          <h2>Drirección</h2>
          <label htmlFor="province">Provincia</label>
          <input
            type="text"
            name="province"
            value={clientRegister.province}
            onChange={handleChange}
            placeholder="Provincia"
          />
          <label htmlFor="location">Localidad</label>
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
              <label htmlFor="provinceJob">Provincia</label>
              <input
                type="text"
                name="provinceJob"
                value={clientRegister.provinceJob}
                onChange={handleChange}
                placeholder="Provincia"
              />
              <label htmlFor="locationJob">Localidad</label>
              <input
                type="text"
                name="locationJob"
                value={clientRegister.locationJob}
                onChange={handleChange}
                placeholder="Localidad"
              />
            </div>
            <label htmlFor="profession">Profesión</label>
            <input
              type="text"
              name="profession"
              value={clientRegister.profession}
              onChange={handleChange}
              placeholder="profesión"
            />
            <label htmlFor="description">Descripción</label>
            <input
              type="text"
              name="description"
              value={clientRegister.description}
              onChange={handleChange}
              placeholder="descripción"
            />
            <label htmlFor="remoteWork">Trabajo Remoto</label>
            <input
              type="checkbox"
              // id="myCheckbox"
              name="remoteWork"
              value={remoteWork}
              onChange={handleChange}
            />
          </div>
        )}
        <label htmlFor="image">Imagen</label>
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
              Submit
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
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Registration;
