import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import TransactionChart from "./TransactionChart";
import FinancialSummary from "./FinancialSummary";
import UserStatistics from "./UserStatistics";
import TransactionList from "./TransactionList";

const AdminDashboard = () => {
  //descomentar 'useSelector' para traer el nombre del administrador
  const admin = { name: "Raul" }; //   useSelector((state) => state.admin);

  return (
    // agragar navBar de admin
    <div className="App">
      <header className="App-header">
        <h1>Administrator AdminDashboard</h1>
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

export default AdminDashboard;
