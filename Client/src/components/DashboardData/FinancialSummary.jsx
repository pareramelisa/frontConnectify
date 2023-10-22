import React from "react";

const FinancialSummary = () => {
  // Datos a deshardcodear a futuro
  const revenue = 50000;
  const expenses = 25000;
  const profit = revenue - expenses;

  return (
    <div className="financial-summary">
      <h2>Financial Summary</h2>
      <p>Revenue: ${revenue}</p>
      <p>Expenses: ${expenses}</p>
      <p>Net Profit: ${profit}</p>
    </div>
  );
};

export default FinancialSummary;
