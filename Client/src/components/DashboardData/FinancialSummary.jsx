import React from "react";

const FinancialSummary = () => {
  // Datos a deshardcodear a futuro
  const revenue = 50000;
  const expenses = 25000;
  const profit = revenue - expenses;

  return (
    <div className="financial-summary">
      <h2>Resumen Financiero</h2>
      <p>Ganancias: ${revenue}</p>
      <p>Desembolsos: ${expenses}</p>
      <p>Ganancia Neta: ${profit}</p>
    </div>
  );
};

export default FinancialSummary;
