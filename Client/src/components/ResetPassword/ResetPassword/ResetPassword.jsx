/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resetRequest } from '../../../redux/Slices/RequestPasswordSlice';
import { selectUserType } from '../../../redux/Slices/userTypeSlice';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../../assets/logoTituloC.png';
import validatePassword from './passwordValidation';
import Notification from '../Notification/Notification';
import './ResetPassword.css';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const userType = useSelector(selectUserType);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tokenRecovery = queryParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {}, [tokenRecovery]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        resetRequest({
          tokenRecovery,
          NewPassword: newPassword,
          userType: userType,
        })
      );
      if (response === undefined) {
        // Muestra un mensaje de error si la respuesta es undefined
        console.error('La respuesta es undefined.');
        window.alert('Error en la solicitud');
        return;
      }
      // La solicitud fue exitosa
      setNotificationMessage(response.data.message);
      setShowNotification(true);
    } catch (error) {
      console.error('Error resetting password:', error);
      window.alert(error);
    }
  };

  const handlePasswordChange = (newPassword) => {
    // Validar la contraseña a medida que se escribe
    const passwordValidation = validatePassword(newPassword);

    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.errorMessage);
      setIsSubmitDisabled(true);
    } else {
      setPasswordError('');
    }

    setNewPassword(newPassword);
  };

  const handleConfirmPasswordChange = (confirmPassword) => {
    // Validar que las contraseñas coincidan a medida que se escribe
    if (newPassword !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden.');
      setIsSubmitDisabled(true);
    } else {
      setPasswordError('');
      setIsSubmitDisabled(false);
    }

    setConfirmPassword(confirmPassword);
  };

  return (
    <div className="mainDiv">
      <div className="cardStyle">
        <form>
          <img
            src={logo}
            alt="logo"
            style={{
              width: '28em',
              height: '10em',
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          />
          <h2 className="formTitle">Ingresa tu nueva contraseña</h2>

          <div className="inputDiv">
            <label className="inputLabel">Nueva contraseña</label>
            <input
              type="password"
              id="password"
              value={newPassword}
              onChange={(e) => handlePasswordChange(e.target.value)}
              required
            />
          </div>

          <div className="inputDiv">
            <label className="inputLabel">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              required
            />
          </div>
          {passwordError && <p className="errorText">{passwordError}</p>}
          <div className="buttonWrapper">
            <button
              type="button"
              id="submitButton"
              onClick={handleResetPassword}
              className="submitButton pure-button pure-button-primary"
              disabled={isSubmitDisabled}
            >
              <span>Continuar</span>
            </button>
          </div>
        </form>
      </div>
      {showNotification && <Notification message={notificationMessage} />}
    </div>
  );
};

export default ResetPassword;
