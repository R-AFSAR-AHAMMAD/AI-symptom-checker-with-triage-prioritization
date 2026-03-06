import { useState } from "react";

const SYMPTOMS = [
  { icon: "🌡️", label: "Fever" },
  { icon: "🤕", label: "Headache" },
  { icon: "😮‍💨", label: "Shortness of Breath" },
  { icon: "💔", label: "Chest Pain" },
  { icon: "🤢", label: "Nausea" },
  { icon: "🤮", label: "Vomiting" },
  { icon: "😵", label: "Dizziness" },
  { icon: "😴", label: "Fatigue" },
  { icon: "🤧", label: "Cough" },
  { icon: "😣", label: "Sore Throat" },
  { icon: "🫃", label: "Stomach Pain" },
  { icon: "🦴", label: "Back Pain" },
  { icon: "🦵", label: "Joint Pain" },
  { icon: "🔴", label: "Rash" },
  { icon: "🥶", label: "Chills" },
  { icon: "👁️", label: "Blurred Vision" },
];

const SymptomForm = ()=> {
  const [step, setStep] = useState(1);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleSymptom = (label) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setStep(3);
  };

  const reset = () => {
    setStep(1);
    setAge("");
    setGender("");
    setSelected([]);
    setSubmitted(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0d1117;
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
        }

        .wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          background: radial-gradient(ellipse at 20% 50%, #0d2340 0%, #0d1117 60%),
                      radial-gradient(ellipse at 80% 20%, #0a1f35 0%, transparent 50%);
        }

        .card {
          background: #111827;
          border: 1px solid #1f2937;
          border-radius: 24px;
          width: 100%;
          max-width: 540px;
          padding: 2.5rem;
          box-shadow: 0 25px 80px rgba(0,0,0,0.5);
          animation: fadeUp 0.4s ease forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .header-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.2);
          color: #38bdf8;
          padding: 0.3rem 0.9rem;
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        h1 {
          font-family: 'Sora', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          color: #f9fafb;
          line-height: 1.2;
          margin-bottom: 0.4rem;
        }

        h1 span { color: #38bdf8; }

        .subtitle {
          color: #6b7280;
          font-size: 0.9rem;
          margin-bottom: 2rem;
        }

        /* Progress bar */
        .progress {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 2rem;
        }

        .progress-dot {
          height: 4px;
          flex: 1;
          border-radius: 4px;
          background: #1f2937;
          transition: background 0.3s;
        }

        .progress-dot.active { background: #38bdf8; }
        .progress-dot.done   { background: #0ea5e9; }

        /* Labels */
        label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: #9ca3af;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        /* Inputs */
        input[type="number"], select {
          width: 100%;
          padding: 0.85rem 1rem;
          background: #1f2937;
          border: 1.5px solid #374151;
          border-radius: 12px;
          color: #f9fafb;
          font-size: 1rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s;
          margin-bottom: 1.25rem;
          appearance: none;
        }

        input[type="number"]:focus,
        select:focus { border-color: #38bdf8; }

        select option { background: #1f2937; }

        /* Symptom grid */
        .symptom-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }

        .symptom-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.7rem 1rem;
          background: #1f2937;
          border: 1.5px solid #374151;
          border-radius: 12px;
          color: #d1d5db;
          font-size: 0.88rem;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.15s;
          text-align: left;
        }

        .symptom-btn:hover {
          border-color: #4b5563;
          background: #263040;
        }

        .symptom-btn.selected {
          background: rgba(56, 189, 248, 0.1);
          border-color: #38bdf8;
          color: #f0f9ff;
        }

        .symptom-btn .icon { font-size: 1.2rem; }

        /* Counter badge */
        .counter {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #38bdf8;
          color: #0d1117;
          font-weight: 700;
          font-size: 0.75rem;
          width: 1.4rem;
          height: 1.4rem;
          border-radius: 50%;
          margin-left: auto;
        }

        /* Primary button */
        .btn-primary {
          width: 100%;
          padding: 1rem;
          background: #38bdf8;
          color: #0d1117;
          border: none;
          border-radius: 14px;
          font-size: 1rem;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.01em;
        }

        .btn-primary:hover { background: #7dd3fc; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

        .btn-ghost {
          width: 100%;
          padding: 0.75rem;
          background: transparent;
          color: #6b7280;
          border: 1.5px solid #374151;
          border-radius: 14px;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          margin-top: 0.75rem;
          transition: all 0.2s;
        }

        .btn-ghost:hover { border-color: #6b7280; color: #9ca3af; }

        /* Result screen */
        .result-list {
          background: #1f2937;
          border-radius: 14px;
          padding: 1.25rem;
          margin: 1.25rem 0;
        }

        .result-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0;
          color: #e5e7eb;
          font-size: 0.92rem;
          border-bottom: 1px solid #374151;
        }

        .result-item:last-child { border-bottom: none; }

        .result-item .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #38bdf8;
          flex-shrink: 0;
        }

        .note {
          font-size: 0.78rem;
          color: #4b5563;
          text-align: center;
          margin-top: 1rem;
          line-height: 1.5;
        }
      `}</style>

      <div className="wrapper">
        <div className="card">

          {/* Progress dots */}
          <div className="progress">
            <div className={`progress-dot ${step >= 1 ? (step > 1 ? "done" : "active") : ""}`} />
            <div className={`progress-dot ${step >= 2 ? (step > 2 ? "done" : "active") : ""}`} />
            <div className={`progress-dot ${step >= 3 ? "active" : ""}`} />
          </div>

          {/* ─── STEP 1: Basic Info ─────────────────── */}
          {step === 1 && (
            <>
              <div className="header-tag">🏥 Triage Check</div>
              <h1>Tell us about <span>yourself</span></h1>
              <p className="subtitle">Takes less than 2 minutes</p>

              <label>Your Age</label>
              <input
                type="number"
                placeholder="e.g. 28"
                min="1" max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <label>Biological Sex</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Prefer not to say</option>
              </select>

              <button
                className="btn-primary"
                disabled={!age || !gender}
                onClick={() => setStep(2)}
              >
                Continue →
              </button>
            </>
          )}

          {/* ─── STEP 2: Symptoms ───────────────────── */}
          {step === 2 && (
            <>
              <div className="header-tag">🩺 Symptoms</div>
              <h1>What are you <span>feeling?</span></h1>
              <p className="subtitle">Tap everything that applies right now</p>

              <div className="symptom-grid">
                {SYMPTOMS.map(({ icon, label }) => (
                  <button
                    key={label}
                    className={`symptom-btn ${selected.includes(label) ? "selected" : ""}`}
                    onClick={() => toggleSymptom(label)}
                  >
                    <span className="icon">{icon}</span>
                    {label}
                    {selected.includes(label) && <span className="counter">✓</span>}
                  </button>
                ))}
              </div>

              <button
                className="btn-primary"
                disabled={selected.length === 0}
                onClick={handleSubmit}
              >
                Analyze {selected.length > 0 ? `(${selected.length} symptoms)` : "Symptoms"} →
              </button>

              <button className="btn-ghost" onClick={() => setStep(1)}>← Back</button>
            </>
          )}

          {/* ─── STEP 3: Result ─────────────────────── */}
          {step === 3 && (
            <>
              <div className="header-tag">✅ Submitted</div>
              <h1>Got it, <span>thank you</span></h1>
              <p className="subtitle">Age {age} · {gender} · {selected.length} symptom{selected.length !== 1 ? "s" : ""} reported</p>

              <div className="result-list">
                {selected.map((s) => (
                  <div className="result-item" key={s}>
                    <div className="dot" />
                    {s}
                  </div>
                ))}
              </div>

              <button className="btn-primary" onClick={reset}>
                Start Over
              </button>

              <p className="note">
                ⚠️ This is not a medical diagnosis.<br />
                Always consult a qualified healthcare professional.
              </p>
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default SymptomForm