import React from "react";

const UserStatistics = () => {
  // Datos temporal de ejemplo para estadísticas de usuarios
  const totalUsers = 1000;
  const activeUsers = 800;
  const newUsers = 50;

  return (
    <div className="user-statistics">
      <h2>Estadisticas de Usuarios</h2>
      <p>Usuarios Totales: {totalUsers}</p>
      <p>Usuarios Activos: {activeUsers}</p>
      <p>Nuevos Usuarios: {newUsers}</p>
    </div>
  );
};

export default UserStatistics;
