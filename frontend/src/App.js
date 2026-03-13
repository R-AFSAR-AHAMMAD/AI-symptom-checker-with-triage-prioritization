import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SymptomForm from "./pages/SymptomForm";
import StaffDashboard from "./pages/StaffDashboard";
import Login from "./pages/Login";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SymptomForm />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/staff"
        element={
          <ProtectedRoute>
            <StaffDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default App;
