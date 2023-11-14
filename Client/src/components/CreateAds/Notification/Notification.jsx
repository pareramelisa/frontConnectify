/* eslint-disable react/prop-types */
import {
  NotificationCard,
  NotificationPara,
  ButtonContainer,
  HomeBtn,
  DetailBtn,
  Imagen,
  DivContainer,
} from './StyledNotification';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logoTituloC.png';

export default function Notification({ anuncio }) {
  return (
    <DivContainer>
      <NotificationCard>
        <Imagen src={logo} alt="logo" />
        <NotificationPara>
          Tu anuncio ha sido creado con éxito! Nos complace informarte que hemos
          recibido y registrado tu anuncio de manera satisfactoria. Gracias por
          confiar en nuestros servicios.
        </NotificationPara>
        <ButtonContainer>
          <HomeBtn>
            <Link
              to={`/home`}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              ir al Inicio
            </Link>
          </HomeBtn>
          <DetailBtn>
            <Link
              to={`/detail/${anuncio}`}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Ir al Anuncio
            </Link>
          </DetailBtn>
        </ButtonContainer>
      </NotificationCard>
    </DivContainer>
  );
}
