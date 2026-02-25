//
const express = require("express");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const cors = require("cors");

const app = express();

// ✅ ENABLE CORS FIRST
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// ✅ BODY PARSER
app.use(express.json());

// ✅ DB CONNECTION
connectDB();

// ✅ ROUTES
app.use("/student", studentRoutes);

// ✅ SERVER
const PORT = process.env.PORT || 5000;
app.listen(5000, "0.0.0.0", () => {
  console.log("Server is running on port 5000");
});
