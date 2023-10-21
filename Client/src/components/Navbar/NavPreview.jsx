
import { Link } from 'react-router-dom';

function Navbar({ role }) {
  return (
    <nav>
      {role === 'client' && (
        <ul>

          <li>
            <Link to="/client/favorites">Favoritos</Link>
          </li>
          <li>
            <Link to="/client/detail/profesional_id">Detalle del Profesional</Link>
          </li>
          <li>
            <Link to="/client/buyPage/profesional_id">Comprar</Link>
          </li>
          <li>
            <Link to="/client/successPay">Pago Exitoso</Link>
          </li>
          <li>
            <Link to="/client/account">Cuenta de Cliente</Link>
          </li>
          <li>
            <Link to="/client/purchases">Historial de Compras</Link>
          </li>
          <li>
            <Link to="/">Salir</Link>
          </li>
        </ul>
      )}

      {role === 'expert' && (
        <ul>
          
          <li>
            <Link to="/professional/profileCreate">Crear Perfil</Link>
          </li>
          <li>
            <Link to="/professional/adsCreate">Crear Anuncio</Link>
          </li>
          <li>
            <Link to="/professional/adsEdit/ad_id">Editar Anuncio</Link>
          </li>
          <li>
            <Link to="/professional/profile">Perfil de Experto</Link>
          </li>
          <li>
            <Link to="/professional/profileEdit">Editar Perfil</Link>
          </li>
          <li>
            <Link to="/">Salir</Link>
          </li>
        </ul>
      )}

      {role === 'admin' && (
        <ul>
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/">Salir</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;

