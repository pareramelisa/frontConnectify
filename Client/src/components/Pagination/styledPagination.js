import styled from 'styled-components';

export const Container = styled.div`
  width: fit-content;
  position: relative;
  display: flex;
  align-items: center;
  margin: 3em 3em 0 3em;
  border-radius: 9999px;
  background-color: red;
  color: #000000;
  width: var(--container_width);
  overflow: hidden;
  border: 1px solid rgba(53, 52, 52, 0.226);
`;

export const Label = styled.label`
  width: 100%;
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  font-weight: 600;
  letter-spacing: -1px;
  font-size: 14px;
  position: relative; /* Agrega posición relativa para establecer estilos en Selection */

  /* Establece el estilo de hover en RadioInputLabel */
  &:hover {
    background-color: blue; /* Reemplaza con el color deseado */
    color: black; /* Reemplaza con el color de texto deseado */
  }

  /* Establece el estilo de hover en Selection */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black; /* Reemplaza con el color deseado */
    opacity: 0; /* Inicialmente invisible */
    pointer-events: none; /* Evita que capture eventos de ratón */
    z-index: -1;
  }

  /* Establece el estilo de hover en Selection cuando el número está seleccionado */
  &.active::after {
    opacity: 1; /* Mostrar cuando está activo */
  }
`;
