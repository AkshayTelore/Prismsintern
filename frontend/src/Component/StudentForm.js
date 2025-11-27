import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);  // store students array

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/students/register",
        { name, email, age }
      );

      setMessage(res.data.message);

      fetchStudents();
      setName("");
      setEmail("");
      setAge("");

    } catch {
      setMessage("Error registering student");
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students/");
      setData(res.data);     
    } catch (err) {
      console.log("Error fetching students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
          required
        /><br /><br />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          required
        /><br /><br />

        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter Age"
          required
        /><br /><br />

        <button type="submit">Register</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <h3>Registered Students:</h3>

      {data.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {data.map((student) => (
            <li key={student._id}>
              {student.name} — {student.email} — {student.age}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
