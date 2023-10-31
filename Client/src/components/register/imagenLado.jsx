import React from 'react';
import photo from "../../assets/register.png";

const ImageOverlay = () => {
  return (
    <div >
      <img
        src={photo}
        alt="Descripción de la imagen"
        style={{
           
            top: 1,           
          maxWidth: '200%', // Establece el ancho al 50% del contenedor
          zIndex: -100, // Coloca la imagen detrás del fondo
        }}
      />
    </div>
  );
}

export default ImageOverlay;
