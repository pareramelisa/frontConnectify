const validationLogin = (form) => {
  const errors = {};

  if (form.email === "") {
    errors.email = "El mail esta vacio";
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
    errors.email = "El mail es invalido";
  }

  if (form.password === "") {
    errors.password = "La contraseña esta vacia";
  }

  return errors;
};

export default validationLogin;
