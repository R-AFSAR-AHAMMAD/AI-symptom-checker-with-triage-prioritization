const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const patientRoutes = require("./routes/patientRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/patients",patientRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});