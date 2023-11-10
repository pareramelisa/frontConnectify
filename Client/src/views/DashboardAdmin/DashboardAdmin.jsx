import AdminDashboard from "../../components/DashboardData/Dashboard";
import ProfsForAdmin from "../../components/DashboardData/ProfsForAdmin/ProfsForAdmin";
import Header from "../../components/DashboardData/Header";

const DashboardAdmin = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            flex: 5,
            justifySelf: "center",

            marginLeft: "7%",
          }}
        >
          <ProfsForAdmin />
        </div>
        <div style={{ flex: 5, marginRight: "5%" }}>
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
};
export default DashboardAdmin;
