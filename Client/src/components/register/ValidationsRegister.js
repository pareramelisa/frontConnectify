

export function validateEmail(value) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      return 'Revisar este campo. El email debe tener un formato válido y no debe estar registrado con anterioridad.';
    }
    return null; // No hay error
  }
  // Función para validar el formato de imagen (png o jpg)
  export function validateImageFormat(file) {
    if (file) {
      const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedFormats.includes(file.type)) {
        return 'Formato de imagen no válido. Por favor, suba una imagen PNG, JPG o JPEG de máximo 10MB.';
      }
    }
    return null; // No hay error
  }
  