export const isValidTitle = (title) => {
  const maxLength = 40; // Ajusta según tus necesidades

  if (title.length > maxLength) {
    return {
      isValid: false,
      errorMessage: `El título no puede tener más de ${maxLength} caracteres.`,
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
};

export const isValidPrice = (price) => {
  if (price < 0) {
    return {
      isValid: false,
      errorMessage: 'El precio no puede ser negativo.',
    };
  }
  if (price > 10000) {
    return {
      isValid: false,
      errorMessage: 'El precio no puede ser mayor a 10000.',
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
};

export const isValidDescription = (description) => {
  const maxLength = 300;

  if (description.length < 0) {
    return {
      isValid: false,
      errorMessage: 'La descripción debe tener al menos 10 caracteres.',
    };
  }
  if (description.length > maxLength) {
    return {
      isValid: false,
      errorMessage: `La descripción no puede tener más de ${maxLength} caracteres.`,
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
};
