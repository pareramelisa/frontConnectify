const validationModify = (form) => {
  const errors = {};

  if (form.email === "") {
    errors.email = "El mail esta vacio";
  }
  if (!/^[a-zA-Z0-9._%]+@[a-zA-Z0-9.-]+\.(com(\.ar)?)$/.test(form.email)) {
    errors.email = "El mail es invalido";
  }

  if (form.profession === "") {
    errors.profession = "la profesion esta vacio";
  }

  if (form.description === "") {
    errors.description = "la descripcion esta vacio";
  }

  if (form.description.length > 101) {
    errors.description = "La descripcion tiene caracteres de mas";
  }

  return errors;
};

export default validationModify;
