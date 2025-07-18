// /client/src/components/layouts/DashboardLayout.jsx

import Sidebar from '../Sidebar'; // optional
import Header from '../Header';   // optional

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100">
        <Header />
        <section className="p-4 overflow-y-auto">{children}</section>
      </main>
    </div>
  );
};

export default DashboardLayout;

