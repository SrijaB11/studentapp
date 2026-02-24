const express = require("express");
const {
  getStudents,
  onRegister,
  onLogin,
} = require("../controllers/studentController");

const router = express.Router();

router.get("/getData", getStudents);
router.post("/register", onRegister);
router.post("/login", onLogin);

module.exports = router;
