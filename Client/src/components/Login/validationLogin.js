const validationLogin = (form) => {
  const errors = {};

  if (form.email === "") {
    errors.email = "El mail esta vacio";
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(form.email)) {
    errors.email = "El mail es invalido";
  }

  if (form.password === "") {
    errors.password = "La contraseña esta vacia";
  }

  return errors;
};

export default validationLogin;
