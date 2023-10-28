const Header = () => {
  const admin = { name: "Leonardo Rosales" };
  //   useSelector((state) => state.admin);
  // localStorage.getItem("adminName")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Dashboard de Administrador</h1>
      <h2>Bienvenido, {admin.name}</h2>
    </div>
  );
};
export default Header;
