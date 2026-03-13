import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("jwtToken", response.data.jwtToken);
      navigate("/staff");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginPage">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .loginPage {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
        }

        /* Left panel */
        .leftPanel {
          flex: 1;
          background: #0f172a;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4rem;
          position: relative;
          overflow: hidden;
        }

        .leftPanel::before {
          content: '';
          position: absolute;
          top: -100px;
          left: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%);
          border-radius: 50%;
        }

        .leftPanel::after {
          content: '';
          position: absolute;
          bottom: -50px;
          right: -50px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%);
          border-radius: 50%;
        }

        .brandTag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(56,189,248,0.1);
          border: 1px solid rgba(56,189,248,0.2);
          color: #38bdf8;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 2rem;
          width: fit-content;
        }

        .brandTitle {
          font-family: 'Sora', sans-serif;
          font-size: 2.8rem;
          font-weight: 800;
          color: #f9fafb;
          line-height: 1.15;
          margin-bottom: 1rem;
        }

        .brandTitle span { color: #38bdf8; }

        .brandDesc {
          color: #6b7280;
          font-size: 1rem;
          line-height: 1.7;
          max-width: 380px;
          margin-bottom: 3rem;
        }

        .statsGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          max-width: 380px;
        }

        .statItem {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 1rem;
        }

        .statItem .num {
          font-family: 'Sora', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: #38bdf8;
        }

        .statItem .lbl {
          font-size: 0.75rem;
          color: #4b5563;
          margin-top: 0.2rem;
        }

        /* Right panel */
        .rightPanel {
          width: 480px;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 2.5rem;
        }

        .loginCard { width: 100%; max-width: 380px; }

        .loginHeader { margin-bottom: 2rem; }

        .loginHeader h2 {
          font-family: 'Sora', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.3rem;
        }

        .loginHeader p { color: #64748b; font-size: 0.9rem; }

        .inputGroup { margin-bottom: 1.25rem; }

        .inputLabel {
          display: block;
          font-size: 0.82rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .inputField {
          width: 100%;
          padding: 0.85rem 1rem;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 0.95rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          background: white;
          color: #0f172a;
          transition: border-color 0.2s;
        }

        .inputField:focus { border-color: #38bdf8; }

        .errorText {
          color: #ef4444;
          font-size: 0.85rem;
          margin-bottom: 1rem;
          padding: 0.6rem 0.9rem;
          background: #fef2f2;
          border-radius: 8px;
          border: 1px solid #fecaca;
        }

        .loginBtn {
          width: 100%;
          margin-top: 0.5rem;
          padding: 0.9rem;
          background: #0f172a;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
        }

        .loginBtn:hover { background: #1e293b; transform: translateY(-1px); }
        .loginBtn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .loginFooter {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.85rem;
          color: #94a3b8;
        }

        .loginLink { color: #0ea5e9; text-decoration: none; font-weight: 600; }

        .divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .divider hr { flex: 1; border: none; border-top: 1px solid #e5e7eb; }
        .divider span { font-size: 0.8rem; color: #9ca3af; }

        @media (max-width: 768px) {
          .leftPanel { display: none; }

          .rightPanel {
            width: 100%;
            background: #0f172a;
          }

          .loginCard {
            background: #111827;
            padding: 2rem;
            border-radius: 20px;
            border: 1px solid #1f2937;
          }

          .loginHeader h2 { color: #f9fafb; }
          .loginHeader p { color: #6b7280; }
          .inputLabel { color: #9ca3af; }

          .inputField {
            background: #1f2937;
            border-color: #374151;
            color: #f9fafb;
          }

          .loginBtn { background: #38bdf8; color: #0d1117; }
          .loginBtn:hover { background: #7dd3fc; }
          .loginFooter { color: #4b5563; }
        }
      `}</style>

      {/* Left Panel */}
      <div className="leftPanel">
        <div className="brandTag">🏥 TriageCare</div>
        <h1 className="brandTitle">
          Smart Triage.<br />
          <span>Faster Care.</span>
        </h1>
        <p className="brandDesc">
          AI-powered symptom analysis that helps clinic staff prioritize patients and deliver faster, smarter care.
        </p>
        <div className="statsGrid">
          <div className="statItem">
            <div className="num">AI</div>
            <div className="lbl">Powered</div>
          </div>
          <div className="statItem">
            <div className="num">5x</div>
            <div className="lbl">Faster Triage</div>
          </div>
          <div className="statItem">
            <div className="num">24/7</div>
            <div className="lbl">Available</div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="rightPanel">
        <div className="loginCard">
          <div className="loginHeader">
            <h2>Welcome back 👋</h2>
            <p>Sign in to access the triage dashboard</p>
          </div>

          <div className="inputGroup">
            <label className="inputLabel">Email</label>
            <input
              type="email"
              placeholder="staff@triagecare.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputField"
            />
          </div>

          <div className="inputGroup">
            <label className="inputLabel">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="inputField"
            />
          </div>

          {error && <p className="errorText">{error}</p>}

          <button onClick={handleLogin} className="loginBtn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In →"}
          </button>

          <div className="divider">
            <hr /><span>or</span><hr />
          </div>

          <p className="loginFooter">
            Are you a patient?{" "}
            <a href="/" className="loginLink">Check your symptoms</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;