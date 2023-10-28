import AdminDashboard from "../../components/DashboardData/Dashboard";
import ProfsForAdmin from "../../components/DashboardData/ProfsForAdmin";
const admin = { name: "Leonardo Rosales" }; //   useSelector((state) => state.admin);

const DashboardAdmin = () => {
  return (
    <div>
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            flex: 6,
            justifySelf: "center",
            // marginTop: "5%",
            marginLeft: "10%",
          }}
        >
          <ProfsForAdmin />
        </div>
        <div style={{ flex: 4, marginRight: "5%" }}>
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
};
export default DashboardAdmin;
