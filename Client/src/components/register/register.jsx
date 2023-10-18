import React, { useState } from "react";
import style from "./register.module.css";

const ClientRegister = () => {
  const [clientRegister, setclientRegister] = useState({
    Name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
    address: { province: "", location: "" },
  });
  const [passwordType, setPasswordType] = useState(false);
  const handleHide = (e) => {
    const icon = e.target.id;

    if (icon === "hide") {
      if (passwordType) {
        setPasswordType(false);
      } else {
        setPasswordType(true);
      }
    }
    const iconVisible = (
      <svg
        onClick={handleHide}
        xmlns="http://www.w3.org/2000/svg"
        id="hide1"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-eye-fill"
        viewBox="0 0 16 16"
      >
        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
      </svg>
    );

    const iconInvisible = (
      <svg
        onClick={handleHide}
        xmlns="http://www.w3.org/2000/svg"
        id="hide1"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-eye-slash-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
          onClick={handleHide}
        />
        <path
          d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
          onClick={handleHide}
        />
      </svg>
    );

    const handleSubmit = (e) => {
      e.preventDefault();
    };
    return (
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label class="form-label lead" htmlFor="First Name">
            First Name
          </label>
          <input
            type="text"
            name="name"
            class={`form-control ${style.inputs}`}
            value={clientRegister.fullName}
            onChange={handleChange}
            placeholder="First Name"
          />
          <label class="form-label lead" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            class={`form-control ${style.inputs}`}
            value={clientRegister.lastName}
            onChange={handleChange}
            placeholder="lastName"
          />
          <label class="form-label lead" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            class={`form-control ${style.inputs}`}
            value={clientRegister.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <label class="form-label lead" htmlFor="email">
            Email :
          </label>
          <input
            type="email"
            name="email"
            value={clientRegister.email}
            class={`form-control ${style.inputs}`}
            onChange={handleChange}
            placeholder="Email"
          />
          <div
            class="mt-3"
            style={{
              textAlign: "left",
              width: "100%",
              gridArea: "password",
              position: "relative",
            }}
          >
            <label class="form-label lead" htmlFor="password">
              Password :{" "}
            </label>
            <input
              type={passwordType ? "text" : "password"}
              value={clientRegister.password}
              name="password"
              class={`form-control ${style.inputs}`}
              onChange={handleChange}
              placeholder="Password"
            />
            <button
              class={style.iconPassword}
              id="hide"
              type="button"
              onClick={(e) => handleHide(e)}
            >
              {passwordType ? iconVisible : iconInvisible}
            </button>
          </div>
          <div class="col-xs-6 m-3">
            <button
              type="submit"
              style={{
                width: "100%",
                paddingInline: "35px",
                paddingBlock: "10px",
                marginBottom: "20px",
              }}
              className={style.button}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };
};

export default ClientRegister;
