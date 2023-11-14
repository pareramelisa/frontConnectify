import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import TransactionChart from "./TransactionChart";
import FinancialSummary from "./FinancialSummary";
import UserStatistics from "./UserStatistics";
import TransactionList from "./TransactionList";
import CommentsForAdmin from "./CommentsForAdmin/CommentsForAdmin";

const AdminDashboard = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            // margin: "0 20px",
          }}
        >
          <CommentsForAdmin />
          {/* <p>hdhdhdhdhdh</p> */}
          {/* <FinancialSummary />
          <UserStatistics /> */}
          {/* <TransactionList /> */}
        </div>
        {/* <TransactionChart /> */}
      </header>
    </div>
  );
};

export default AdminDashboard;
