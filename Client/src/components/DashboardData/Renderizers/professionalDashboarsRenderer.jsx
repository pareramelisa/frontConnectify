import DashboardProf from "../../../views/DashboardProf/DashboardProf";

const ProfessionalDashboarsRenderer = (userId) => {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userId");

  return <DashboardProf userId={userId} />;
};
export default ProfessionalDashboarsRenderer;
