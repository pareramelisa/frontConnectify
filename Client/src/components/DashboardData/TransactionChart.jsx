import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Datos hardcodeados hasta tener cargada la DB
const data = [
  { name: "Ene", transactions: 100 },
  { name: "Feb", transactions: 150 },
  { name: "Mar", transactions: 200 },
  { name: "Abr", transactions: 120 },
  { name: "May", transactions: 180 },
];

const TransactionChart = () => {
  return (
    <div className="transaction-chart">
      <h2>Transaction Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="transactions"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart;
