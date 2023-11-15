import { useParams } from "react-router-dom";
import DashboardClientForAdmin from "./DashboardClientForAdmin";
import { useSelector } from "react-redux";

const ClientDashboarsRenderer = () => {
  const { userId } = useParams();

  const client = useSelector((state) => state.clients.clients);
  const gato = client.filter((client) => client._id === userId);
  return <DashboardClientForAdmin userId={gato} />;
};

export default ClientDashboarsRenderer;
