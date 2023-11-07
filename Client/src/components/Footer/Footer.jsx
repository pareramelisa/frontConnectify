import './Footer.css';
import { BsFacebook, BsLinkedin, BsInstagram } from 'react-icons/bs';
import { AiOutlineTwitter } from 'react-icons/ai';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      <ul className="social-icon">
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <BsFacebook />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <AiOutlineTwitter />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <BsLinkedin />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <BsInstagram />
          </a>
        </li>
      </ul>
      <ul className="menu">
        <li className="menu__item">
          <a className="menu__link" href="ourTeam">
            Nuestro Equipo
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="#">
            Sobre nosotros
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="#">
            Necesitas Ayuda
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="#">
            Contacto
          </a>
        </li>
      </ul>
      <p>&copy;2023 Connectify | All Rights Reserved</p>
      {/* <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script> */}
    </footer>
  );
}
