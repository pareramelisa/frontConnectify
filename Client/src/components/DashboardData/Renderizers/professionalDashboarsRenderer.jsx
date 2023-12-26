import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DashBoardProfessionalForAdmin from "./dashBoardProfessionalForAdmin";

const ProfessionalDashboarsRenderer = () => {
  const { userId } = useParams();
  const professional = useSelector(
    (state) => state.professionals.professionals
  );
  const supportee = professional.filter((profs) => profs._id === userId);

  return <DashBoardProfessionalForAdmin userId={supportee} />;
};
export default ProfessionalDashboarsRenderer;
