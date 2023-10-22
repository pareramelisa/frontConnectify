import { debounce } from "lodash";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const RegistrationClient = () => {
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
          confirmPassword: "",
          image: "",
          address: { province: "", location: "" },
        };
  });

  const routeLocation = useLocation();
  const ifProfRoute = routeLocation.pathname === "/professional/registration";

  const [passwordType, setPasswordType] = useState(false);

  const renderPasswordToggle = () => (
    <button type="button" onClick={handleHidePassword}>
      {passwordType ? "Hide" : "Show"}
    </button>
  );
  const handleHidePassword = () => {
    setPasswordType(!passwordType);
  };

  const [province, setProvince] = useState(clientRegister.address.province);
  const [location, setLocation] = useState(clientRegister.address.location);
  //a ajustar en funcion de cómo venga la API de provincias y localidades...

  const handleSubmit = (e) => {
    e.preventDefault();
  }; //a conectar cuando esté el redux andando

  // useEffect(() => {
  //   localStorage.setItem("clientRegisterData", JSON.stringify(clientRegister));
  // }, [clientRegister]);

  const debouncedLocalStorageUpdate = debounce((data) => {
    localStorage.setItem("clientRegisterData", JSON.stringify(data));
  }, 1000); // actualiza cada segundo para no detonar el browser...

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      if (field === "province") {
        setProvince(value);
      } else if (field === "location") {
        setLocation(value);
      }

      setClientRegister({
        ...clientRegister,
        address: {
          ...clientRegister.address,
          [field]: value,
        },
      });
    } else {
      setClientRegister({ ...clientRegister, [name]: value });
    }
    debouncedLocalStorageUpdate(clientRegister);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setClientRegister({
        ...clientRegister,
        image: URL.createObjectURL(file), // a probar cuando se conecte con cloudinary
      });
    }
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
        <label htmlFor="address.province">Province</label>
        <input
          type="text"
          name="address.province"
          value={province}
          onChange={handleChange}
          placeholder="Province"
        />
        <label htmlFor="address.location">Location</label>
        <input
          type="text"
          name="address.location"
          value={location}
          onChange={handleChange}
          placeholder="Location"
        />
        {ifProfRoute && (
          <div>
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
            <label htmlFor="workingRange">Working Range</label>
            <input
              type="text"
              name="workingRange"
              value={clientRegister.workingRange}
              onChange={handleChange}
              placeholder="working range"
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
        </div>
      </form>
    </div>
  );
};

export default RegistrationClient;
