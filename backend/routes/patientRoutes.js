const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

router.post("/",async (req,res)=>{
    try{
        const {age,gender,symptoms} = req.body;

        const patient = new Patient({
            age,gender,symptoms
        })
        res.status(201).json(patient);
    }catch(e){
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