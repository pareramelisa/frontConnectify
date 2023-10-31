import React from 'react';
import photo from "../../assets/register.png";

const ImageOverlay = () => {
  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100vh',
      background: `url(${photo})`, // Establece la imagen de fondo
      backgroundPosition: 'right', // Alinea la imagen hacia la derecha
      backgroundSize: 'cover', // Escala la imagen para cubrir todo el div
    }}>
      {/* Contenido adicional */}
    </div>
  );
}

export default ImageOverlay;

