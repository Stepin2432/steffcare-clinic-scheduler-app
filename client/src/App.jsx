import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/routes/ProtectedRoute";

// Public pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";

// Dashboards
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ReceptionDashboard from "./pages/reception/ReceptionDashboard.jsx";
import DoctorDashboard from "./pages/doctor/DoctorDashboard.jsx";
import PatientDashboard from "./pages/patient/PatientDashboard.jsx";

// Toast Notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Fallback
import NotFound from "./pages/NotFound.jsx";

// ✅ Spinner while auth loads
const LoadingSpinner = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '100vh', backgroundColor: '#f9f9f9'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid #ccc',
      borderTop: '4px solid #4CAF50',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

function App() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return (
    <Router>
      <>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Smart role redirect */}
          <Route
            path="/dashboard"
            element={
              user?.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : user?.role === "doctor" ? (
                <Navigate to="/doctor" replace />
              ) : user?.role === "patient" ? (
                <Navigate to="/patient" replace />
              ) : user?.role === "receptionist" ? (
                <Navigate to="/reception" replace />
              ) : (
                <NotFound />
              )
            }
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["receptionist"]} />}>
            <Route path="/reception/*" element={<ReceptionDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
            <Route path="/doctor/*" element={<DoctorDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
            <Route path="/patient/*" element={<PatientDashboard />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </>
    </Router>
  );
}

export default App;
