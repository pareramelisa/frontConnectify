import React from "react";

const TransactionList = () => {
  // Datos a deshardcodear a futuro
  const transactions = [
    {
      id: 1,
      description: "Sale of Memberships",
      amount: 150,
      date: "2023-10-20",
    },
    {
      id: 2,
      description: "Purchase of Supplies",
      amount: -50,
      date: "2023-10-18",
    },
  ];

  return (
    <div className="transaction-list">
      <h2>Lista de Transacciones Recientes</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <p>{transaction.description}</p>
            <p>Monto: ${transaction.amount}</p>
            <p>Fecha: {transaction.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
