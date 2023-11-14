import { useParams } from "react-router-dom";
import DashboardClient from "../../../views/DashboardClient/DashboardClient";
import { useSelector } from "react-redux";

const ClientDashboarsRenderer = () => {
  const { userId } = useParams();

  const client = useSelector((state) => state.clients.clients);
  const gato = client.filter((client) => client._id === userId);
  return <DashboardClient userId={gato} />;
};

export default ClientDashboarsRenderer;
