

export function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Correo electrónico no válido.';
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
  