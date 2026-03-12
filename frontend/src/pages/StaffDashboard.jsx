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

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.log(err));
  }, []);

  const sorted = patients;

  const visible =
    filter === "all"
      ? sorted
      : sorted.filter((p) => p.urgency === Number(filter));

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
        <h1 className="title">🏥 Triage Dashboard</h1>
        <p className="subtitle">Patients sorted by severity</p>
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
        {visible.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </div>
  );
};

const PatientCard = ({ patient }) => {
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

      <div
        className="badge"
        style={{ background: urgency.bg, color: urgency.color }}
      >
        {urgency.label}
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
