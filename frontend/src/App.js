import { BrowserRouter, Routes, Route } from "react-router-dom";
import SymptomForm from "./pages/SymptomForm";
import StaffDashboard  from "./pages/StaffDashboard";
import Login from "./pages/Login";
const App = () =>
(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SymptomForm />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/staff" element={<StaffDashboard />} />
      </Routes>
    </BrowserRouter>
  );

export default App