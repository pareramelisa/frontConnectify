/* eslint-disable react/prop-types */
import {
  NotificationCard,
  NotificationPara,
  ButtonContainer,
  AllowBtn,
  Imagen,
  DivContainer,
} from './StyledNotification';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logoTituloC.png';

export default function Notification({ message }) {
  return (
    <DivContainer>
      <NotificationCard>
        <Imagen src={logo} alt="logo" />
        <NotificationPara>{message}</NotificationPara>
        <ButtonContainer>
          <AllowBtn>
            <Link
              to={`/home`}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Go to Home
            </Link>
          </AllowBtn>
        </ButtonContainer>
      </NotificationCard>
    </DivContainer>
  );
}
