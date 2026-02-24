const studentModel = require("../models/studentmodel");
const jwt = require("jsonwebtoken");

let createStudent = async (req, res) => {
  let data = req.body; //
  let status = await studentModel.findOne({ email: data.email });
  if (status) {
    res.send("email already exists!!!!");
  }
  let rev = await studentModel.create(data);
  console.log(rev);

  res.send("stored!!");
};

let getStudents = async (req, res) => {
  try {
    let data = await studentModel.find();

    console.log(data);
    res.send(data);
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};
let onRegister = async (req, res) => {
  try {
    const { email } = req.body;

    const exists = await studentModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await studentModel.create(req.body);
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};

let onLogin = async (req, res) => {
  let result = await studentModel.findOne(req.body);
  // console.log(result);
  if (!result) {
    res.send("invalid details");
  }
  let token = jwt.sign(
    { name: result.name, id: result._id, email: result.email },
    "aaa12345",
  );
  res.json({ token });
};

function auth(req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let decode = jwt.verify(token, "aaa12345");
    console.log(decode);
    next();
  } catch (err) {
    res.send("invalid token");
  }
}

module.exports = {
  createStudent,
  getStudents,
  onRegister,
  onLogin,
};
