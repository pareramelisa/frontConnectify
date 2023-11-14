const validatePassword = (password) => {
  // Devuelve un objeto con dos propiedades: isValid y errorMessage
  if (password.length < 6) {
    return {
      isValid: false,
      errorMessage: 'La contraseña debe tener al menos 8 caracteres.',
    };
  }

  if (password.length > 15) {
    return {
      isValid: false,
      errorMessage: 'La contraseña no puede tener más de 15 caracteres.',
    };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      errorMessage: 'La contraseña debe tener al menos una letra mayúscula.',
    };
  }
  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      errorMessage: 'La contraseña debe tener al menos un número.',
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
};

export default validatePassword;
