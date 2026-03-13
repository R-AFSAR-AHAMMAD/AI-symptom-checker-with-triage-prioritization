import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

const handleLogin = async () => {
  if (!email || !password) {
    setError("Please fill in both fields");
    return;
  }

  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    // save token to localStorage
    localStorage.setItem("jwtToken", response.data.jwtToken);

    navigate("/staff");
  } catch (error) {
    setError(error.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="loginPage">

      <style>{`

      .loginPage{
        min-height:100vh;
        background:#0f172a;
        display:flex;
        align-items:center;
        justify-content:center;
        font-family:sans-serif;
        padding:1rem;
      }

      .loginCard{
        background:white;
        border-radius:16px;
        padding:2.5rem;
        width:100%;
        max-width:400px;
        box-shadow:0 20px 60px rgba(0,0,0,0.3);
      }

      .loginHeader{
        text-align:center;
        margin-bottom:2rem;
      }

      .loginIcon{
        font-size:2.5rem;
      }

      .loginTitle{
        font-size:1.5rem;
        font-weight:800;
        color:#0f172a;
        margin:0.5rem 0 0.25rem;
      }

      .loginSubtitle{
        color:#64748b;
        font-size:0.9rem;
        margin:0;
      }

      .inputLabel{
        display:block;
        font-size:0.85rem;
        font-weight:600;
        color:#374151;
        margin-bottom:0.4rem;
        margin-top:1rem;
      }

      .inputField{
        width:100%;
        padding:0.75rem 1rem;
        border:1.5px solid #e5e7eb;
        border-radius:10px;
        font-size:0.95rem;
        opacity:0.5;
        outline:none;
        box-sizing:border-box;
      }

      .errorText{
        color:#ef4444;
        font-size:0.85rem;
        margin-top:0.75rem;
        margin-bottom:0;
      }

      .loginBtn{
        width:100%;
        margin-top:1.5rem;
        padding:0.85rem;
        background:#1e40af;
        color:white;
        border:none;
        border-radius:10px;
        font-size:1rem;
        font-weight:700;
        cursor:pointer;
      }

      .loginFooter{
        text-align:center;
        margin-top:1.25rem;
        font-size:0.85rem;
        color:#94a3b8;
      }

      .loginLink{
        color:#1e40af;
        text-decoration:none;
        font-weight:600;
      }

      `}</style>

      <div className="loginCard">

        {/* Header */}
        <div className="loginHeader">
          <span className="loginIcon">🏥</span>
          <h1 className="loginTitle">Staff Login</h1>
          <p className="loginSubtitle">
            Sign in to view the triage dashboard
          </p>
        </div>

        {/* Email */}
        <label className="inputLabel">Email</label>
        <input
          type="email"
          placeholder="staff@triagecare.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputField"
        />

        {/* Password */}
        <label className="inputLabel">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          className="inputField"
        />

        {/* Error */}
        {error && (
          <p className="errorText">{error}</p>
        )}

        {/* Button */}
        <button
          onClick={handleLogin}
          className="loginBtn"
        >
          Sign In →
        </button>

        {/* Footer */}
        <p className="loginFooter">
          Are you a patient?{" "}
          <a href="/" className="loginLink">
            Check your symptoms
          </a>
        </p>

      </div>
    </div>
  );
};

export default Login;