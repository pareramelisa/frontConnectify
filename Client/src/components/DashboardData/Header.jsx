import Handle from "rc-slider/lib/Handles/Handle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const users = useSelector((state) => state.usersLogin.user);
  console.log(users);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };
  return (
    <div>
      <button onClick={handleClick}>Home</button>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Panel de Control</h1>
        <h2>Bienvenido, {users.userName}</h2>
      </div>
    </div>
  );
};
export default Header;
