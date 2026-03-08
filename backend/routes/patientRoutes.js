const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

router.post("/",async (req,res)=>{
  console.log("BODY:", req.body)
    try{
        const {age,gender,symptoms} = req.body;

        const patient = new Patient({
            age,gender,symptoms
        })
        await patient.save();
        res.status(201).json(patient);
    }catch(error){
      console.log("FULL ERROR:", error);
        res.status(500).json({ message: error.message });
    }
})


router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ urgency: -1, createdAt: 1 });

    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;