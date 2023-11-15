const validationModify = (form) => {
  const errors = {};

  if (form.email === "") {
    errors.email = "El mail esta vacio";
  }
  if (!/^[a-zA-Z0-9._%]+@[a-zA-Z0-9.-]+\.(com(\.ar)?)$/.test(form.email)) {
    errors.email = "El mail es invalido";
  }

  if (form.profession === "") {
    errors.profession = "El campo esta vacio";
  }

  if (form.description === "") {
    errors.description = "La descripcion esta vacia";
  }

  if (form.description.length > 101) {
    errors.description = "La descripcion tiene caracteres de mas";
  }

  if (form.location === "") {
    errors.location = "Debe elegir una localidad";
  }

  return errors;
};

export default validationModify;
