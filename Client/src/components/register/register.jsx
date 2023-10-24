import { debounce } from "lodash";
import React, { useState, useEffect } from "react";
// import { useLocation, useHistory } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchUserRegister } from "../../redux/Slices/registerSlice";
import style from "./register.module.css";
import { Checkbox } from "@mui/material";

const Registration = () => {
  const navigate = useNavigate();
  // localStorage.clear();
  const [clientRegister, setClientRegister] = useState(() => {
    const localStorageData = localStorage.getItem("clientRegisterData");
    return localStorageData
      ? JSON.parse(localStorageData)
      : {
          name: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          // confirmPassword: "",
          profession: [],
          workingRange: { province: "", location: "" },
          description: "",
          // image: "",
          address: { province: "", location: "" },
          remoteWork: false,
        };
  });

  const routeLocation = useLocation();
  const ifProfRoute = routeLocation.pathname === "/professional/registration";
  const ifClientRoute = routeLocation.pathname === "/client/registration";

  const [passwordType, setPasswordType] = useState(false);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.append(
      "json_data",
      new Blob([JSON.stringify(clientRegister)], { type: "application/json" })
    );
    if (clientRegister.profession.length === 0)
      dispatch(fetchUserRegister(clientRegister, "client"));
    if (clientRegister.profession !== "")
      dispatch(fetchUserRegister(clientRegister, "professional"));
    localStorage.removeItem("clientRegisterData");
    navigate("/login");
  };

  useEffect(() => {
    localStorage.setItem("clientRegisterData", JSON.stringify(clientRegister));
  }, [clientRegister]);

  // const debouncedLocalStorageUpdate = debounce((data) => {
  //   localStorage.setItem("clientRegisterData", JSON.stringify(data));
  // }, 1000);
  const formData = new FormData();
  const handleChange = (e) => {
    const { name, type, value } = e.target;
    if (type === "checkbox") console.log(e.target.checked);
    setClientRegister({ ...clientRegister, [name]: e.target.checked });
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
  // debouncedLocalStorageUpdate(clientRegister);
  // };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      formData.append("image", file);
      setClientRegister({
        ...clientRegister,
        image: URL.createObjectURL(file), // a probar cuando se conecte con cloudinary
      });
    }
    console.log("Image file name: " + file.name);
    console.log("Image file size: " + file.size + " bytes");
    console.log("Image file type: " + file.type);
    const imageFile = formData.get("image");
    const imgElement = document.createElement("img");
    imgElement.src = URL.createObjectURL(file);
  };

  const areAllProfFieldsCompleted = () => {
    const {
      name,
      lastName,
      username,
      email,
      password,
      address,
      workingRange,
      profession,
      description,
      image,
    } = clientRegister;

    return (
      name &&
      lastName &&
      username &&
      email &&
      password &&
      address.province &&
      address.location &&
      workingRange.province &&
      workingRange.location &&
      profession &&
      description &&
      image
    );
  };
  const areAllClienFieldsCompleted = () => {
    const { name, lastName, username, email, password, address, image } =
      clientRegister;

    return (
      name &&
      lastName &&
      username &&
      email &&
      password &&
      address.province &&
      address.location &&
      image
    );
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">First Name</label>
        <input
          type="text"
          name="name"
          value={clientRegister.name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={clientRegister.lastName}
          onChange={handleChange}
          placeholder="lastName"
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={clientRegister.username}
          onChange={handleChange}
          placeholder="Username"
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
          <label htmlFor="password">Password : </label>
          <input
            type={passwordType ? "text" : "password"}
            value={clientRegister.password}
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
          {renderPasswordToggle()}
        </div>
        <div>
          <h2>Address</h2>
          <label htmlFor="address.province">Province</label>
          <input
            type="text"
            name="address.province"
            value={clientRegister.address.province}
            onChange={handleChange}
            placeholder="Province"
          />
          <label htmlFor="address.location">Location</label>
          <input
            type="text"
            name="address.location"
            value={clientRegister.address.location}
            onChange={handleChange}
            placeholder="Location"
          />
        </div>
        {ifProfRoute && (
          <div>
            <div>
              <h2>Working Range</h2>
              <label htmlFor="workingRange.province">Province</label>
              <input
                type="text"
                name="workingRange.province"
                value={clientRegister.workingRange.province}
                onChange={handleChange}
                placeholder="Province"
              />
              <label htmlFor="workingRange.location">Location</label>
              <input
                type="text"
                name="workingRange.location"
                value={clientRegister.workingRange.location}
                onChange={handleChange}
                placeholder="Location"
              />
            </div>
            <label htmlFor="profession">Profession</label>
            <input
              type="text"
              name="profession"
              value={clientRegister.profession}
              onChange={handleChange}
              placeholder="profession"
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              value={clientRegister.description}
              onChange={handleChange}
              placeholder="description"
            />
            <label htmlFor="remoteWork">Remote Work</label>
            <input
              type="checkbox"
              // id="myCheckbox"
              name="remoteWork"
              value={clientRegister.remoteWork}
              onChange={handleChange}
            />
          </div>
        )}
        <label htmlFor="image">Image</label>
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
