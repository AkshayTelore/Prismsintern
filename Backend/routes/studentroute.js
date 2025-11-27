import express from "express";
const router = express.Router();

let students = []; // Temporary in-memory storage

router.post("/register", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const student = { id: students.length + 1, name, email, age };
  students.push(student);

  return res.status(201).json({ message: "Student registered successfully", student });
});

router.get("/", (req, res) => {
  res.json(students);
});

export default router;
