// client/src/layouts/DashboardLayout.jsx
import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <header>
        <h2>Dashboard Header</h2>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
