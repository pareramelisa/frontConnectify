import React from "react";

const UserStatistics = () => {
  // Datos temporal de ejemplo para estadísticas de usuarios
  const totalUsers = 1000;
  const activeUsers = 800;
  const newUsers = 50;

  return (
    <div className="user-statistics">
      <h2>User Statistics</h2>
      <p>Total Users: {totalUsers}</p>
      <p>Active Users: {activeUsers}</p>
      <p>New Users: {newUsers}</p>
    </div>
  );
};

export default UserStatistics;
