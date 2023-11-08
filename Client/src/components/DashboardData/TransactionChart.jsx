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

const today = new Date();
const monthNames = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const months = [];
for (let i = 0; i < 5; i++) {
  const currentMonth = today.getMonth() - i;
  const adjustedMonth = currentMonth < 0 ? 12 + currentMonth : currentMonth; // Handle negative months
  months.push(monthNames[adjustedMonth]);
}

const data = [
  { name: months[4], Satisfacción: 100, Contrataciones: 50, Suscripciones: 10 },
  { name: months[3], Satisfacción: 150, Contrataciones: 80, Suscripciones: 20 },
  {
    name: months[2],
    Satisfacción: 200,
    Contrataciones: 120,
    Suscripciones: 55,
  },
  { name: months[1], Satisfacción: 120, Contrataciones: 70, Suscripciones: 90 },
  {
    name: months[0],
    Satisfacción: 180,
    Contrataciones: 90,
    Suscripciones: 190,
  },
];

const TransactionChart = () => {
  return (
    <div className="transaction-chart">
      <h2>Gráfico de Transacciones</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Satisfacción"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="Contrataciones"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="Suscripciones"
            stroke="red"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart;
