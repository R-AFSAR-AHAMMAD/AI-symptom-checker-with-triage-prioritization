const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const groq = require("../config/groq");

router.post("/", async (req, res) => {
  try {
    const { age, gender, symptoms } = req.body;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `You are a medical triage assistant. A patient is ${age} years old, ${gender}, and has these symptoms: ${symptoms.join(", ")}. Return ONLY a JSON object like this: { "urgency": 3, "reason": "brief reason" }. Urgency scale: 1=Routine, 2=Low, 3=Moderate, 4=Urgent, 5=Emergency. No extra text, just JSON.`
        }
      ],
    });

    const text = response.choices[0].message.content;
    const cleaned = text.replace(/```json|```/g, "").trim();
    const aiData = JSON.parse(cleaned);

    const patient = new Patient({
      age,
      gender,
      symptoms,
      urgency: aiData.urgency,
    });

    await patient.save();
    res.status(201).json(patient);

  } catch (error) {
    console.log("FULL ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ urgency: -1, createdAt: 1 });

    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;