import { useState, useEffect } from "react";
import axios from "axios";

// Urgency helper
const getUrgencyInfo = (level) => {
  if (level === 5)
    return { label: "Emergency", color: "#ef4444", bg: "#fef2f2" };
  if (level === 4) return { label: "Urgent", color: "#f97316", bg: "#fff7ed" };
  if (level === 3)
    return { label: "Moderate", color: "#eab308", bg: "#fefce8" };
  if (level === 2) return { label: "Low", color: "#3b82f6", bg: "#eff6ff" };
  return { label: "Routine", color: "#22c55e", bg: "#f0fdf4" };
};

const StaffDashboard = () => {
  const [filter, setFilter] = useState("all");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    axios
      .get("http://localhost:5000/api/patients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPatients(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleTreat = async (id) => {
     console.log("Treating patient:", id) 
    const token = localStorage.getItem("jwtToken");

    await axios.patch(
      `http://localhost:5000/api/patients/${id}`,
      { status: "resolved" },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    // update status locally without refetching
    setPatients((prev) =>
      prev.map((p) => (p._id === id ? { ...p, status: "resolved" } : p)),
    );
  };

  const waitingPatients = patients.filter((p) => p.status === "waiting");
  const treatedPatients = patients.filter((p) => p.status === "resolved");

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f1f5f9",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #e2e8f0",
              borderTop: "4px solid #1e40af",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto",
            }}
          />
          <p style={{ marginTop: "1rem", color: "#64748b", fontWeight: 600 }}>
            Loading patients...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      {/* Styles added here */}
      <style>{`
        .page{
          min-height:100vh;
          background:#f1f5f9;
          font-family:sans-serif;
          padding:2rem;
        }

        .topBar{
          margin-bottom:1.5rem;
        }

        .title{
          font-size:1.6rem;
          font-weight:800;
          color:#0f172a;
          margin:0;
        }

        .subtitle{
          color:#64748b;
          margin:0.25rem 0 0;
          font-size:0.9rem;
        }

        .statsRow{
          display:flex;
          gap:1rem;
          margin-bottom:1.5rem;
        }

        .statBox{
          background:white;
          border-radius:12px;
          padding:1rem 1.5rem;
          box-shadow:0 1px 3px rgba(0,0,0,0.08);
          min-width:120px;
        }

        .statNumber{
          font-size:2rem;
          font-weight:800;
          margin:0;
          line-height:1;
        }

        .statLabel{
          font-size:0.8rem;
          color:#64748b;
          margin:0.3rem 0 0;
        }

        .filterRow{
          display:flex;
          gap:0.5rem;
          margin-bottom:1.5rem;
          flex-wrap:wrap;
        }

        .filterBtn{
          padding:0.4rem 1rem;
          border:1.5px solid #e2e8f0;
          border-radius:20px;
          cursor:pointer;
          font-weight:600;
          font-size:0.85rem;
          background:white;
          color:#374151;
        }

        .activeBtn{
          background:#1e40af;
          color:white;
        }

        .cardList{
          display:flex;
          flex-direction:column;
          gap:0.75rem;
        }

        .card{
          background:white;
          border-radius:12px;
          padding:1.25rem 1.5rem;
          display:flex;
          justify-content:space-between;
          align-items:center;
          box-shadow:0 1px 3px rgba(0,0,0,0.07);
        }

        .cardLeft{
          flex:1;
        }

        .patientName{
          font-weight:700;
          color:#0f172a;
          margin:0 0 0.3rem;
          font-size:0.95rem;
        }

        .symptomsText{
          color:#475569;
          font-size:0.85rem;
          margin:0 0 0.3rem;
        }

        .waitText{
          color:#94a3b8;
          font-size:0.8rem;
          margin:0;
        }

        .badge{
          padding:0.4rem 1rem;
          border-radius:20px;
          font-weight:700;
          font-size:0.85rem;
          margin-left:1rem;
          white-space:nowrap;
        }
      `}</style>

      <div className="topBar">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1 className="title">🏥 Triage Dashboard</h1>
            <p className="subtitle">Patients sorted by severity</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("jwtToken");
              window.location.href = "/login";
            }}
            style={{
              padding: "0.5rem 1.2rem",
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="statsRow">
        <StatBox
          label="Total Patients"
          value={patients.length}
          color="#3b82f6"
        />
        <StatBox
          label="Emergencies"
          value={patients.filter((p) => p.urgency === 5).length}
          color="#ef4444"
        />
        <StatBox
          label="Waiting > 30m"
          value={patients.filter((p) => p.waitingMins > 30).length}
          color="#f97316"
        />
      </div>

      <div className="filterRow">
        {["all", "5", "4", "3", "2", "1"].map((val) => (
          <button
            key={val}
            onClick={() => setFilter(val)}
            className={`filterBtn ${filter === val ? "activeBtn" : ""}`}
          >
            {val === "all" ? "All" : getUrgencyInfo(Number(val)).label}
          </button>
        ))}
      </div>

      <div className="cardList">
        <p
          className="subtitle"
          style={{ fontWeight: 700, color: "#0f172a", marginBottom: "0.5rem" }}
        >
          ⏳ Waiting
        </p>
        {waitingPatients.map((patient) => (
          <PatientCard
            key={patient._id}
            patient={patient}
            onTreat={handleTreat}
          />
        ))}

        {treatedPatients.length > 0 && (
          <>
            <p
              className="subtitle"
              style={{
                fontWeight: 700,
                color: "#22c55e",
                margin: "1rem 0 0.5rem",
              }}
            >
              ✅ Treated
            </p>
            {treatedPatients.map((patient) => (
              <PatientCard
                key={patient._id}
                patient={patient}
                onTreat={handleTreat}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const PatientCard = ({ patient, onTreat }) => {
  const urgency = getUrgencyInfo(patient.urgency);

  return (
    <div className="card" style={{ borderLeft: `4px solid ${urgency.color}` }}>
      <div className="cardLeft">
        <p className="patientName">
          Patient #{patient._id} · {patient.age} yrs · {patient.gender}
        </p>
        <p className="symptomsText">{patient.symptoms.join(" · ")}</p>
        <p className="waitText">
          ⏱ Submitted {new Date(patient.createdAt).toLocaleTimeString()}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          className="badge"
          style={{ background: urgency.bg, color: urgency.color }}
        >
          {urgency.label}
        </div>

        {patient.status !== "resolved" && (
          <button
            onClick={() => onTreat(patient._id)}
            style={{ marginLeft: "1rem", padding: "0.4rem 1rem", background: "#22c55e", color: "white", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}
          >
            ✓ Treat
          </button>
        )}
      </div>
    </div>
  );
};

const StatBox = ({ label, value, color }) => {
  return (
    <div className="statBox">
      <p className="statNumber" style={{ color }}>
        {value}
      </p>
      <p className="statLabel">{label}</p>
    </div>
  );
};

export default StaffDashboard;
