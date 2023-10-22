import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import TransactionChart from "../../components/DashboardData/TransactionChart";
import FinancialSummary from "../../components/DashboardData/FinancialSummary";
import UserStatistics from "../../components/DashboardData/UserStatistics";
import TransactionList from "../../components/DashboardData/TransactionList";

const Dashboard = () => {
  //descomentar 'useSelector' para traer el nombre del administrador
  const admin = { name: "Raul" }; //   useSelector((state) => state.admin);

  return (
    // agragar navBar de admin
    <div className="App">
      <header className="App-header">
        <h1>Administrator Dashboard</h1>
        <h2>Wellcome, {admin.name}</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            // margin: "0 20px",
          }}
        >
          <FinancialSummary />
          <UserStatistics />
          <TransactionList />
        </div>
        <TransactionChart />
      </header>
    </div>
  );
};

export default Dashboard;
