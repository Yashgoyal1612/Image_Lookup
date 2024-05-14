import React, { useState } from 'react';
import './App.css';
import studentData from './StudentData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term
  const [searchField, setSearchField] = useState("UnivRollNo"); // Default search field

  const [studentInfo, setStudentInfo] = useState(null); // State to store student information

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleSelectChange = (e) => {
    setSearchField(e.target.value);
  }

  const findStudentInfo = () => {
    const student = studentData.find((student) => {
      if (searchField === "UnivRollNo" || searchField === "StudentNo") {
        return student[searchField] === parseInt(searchTerm);
      } else {
        const fieldValue = student[searchField];
        if (typeof fieldValue === "string") {
          return fieldValue.toLowerCase().includes(searchTerm.toLowerCase());
        } else {
          return false; // Return false for non-string fields like numbers
        }
      }
    });

    if (student) {
      setStudentInfo(student);
    } else {
      setStudentInfo(null); // Clear studentInfo
      toast.error("Student details not found", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1800,
        theme: "dark",
      });
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      findStudentInfo();
    }
  };

  return (
    <div className="container">
      <h1>Student Lookup</h1>
      <div className="input-container">
        <select onChange={handleSelectChange} value={searchField}>
          <option value="UnivRollNo">University Roll No.</option>
          <option value="Name">Name</option>
          <option value="Email">Email</option>
          <option value="FatherName">Father's Name</option>
          <option value="StudentNo">Student No.</option>
        </select>
        <input
          type={searchField === "UnivRollNo" || searchField === "StudentNo" ? "number" : "text"}
          placeholder={`Enter ${searchField}`}
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
        />
        <button onClick={findStudentInfo}>Get Student Info</button>
      </div>
      {studentInfo && (
        <div className="student-info">
          <img src={`https://glauniversity.in:8103/${studentInfo.UnivRollNo}.jpg`} alt="Student" />
          <div className="detail">
            <p>Name: {studentInfo.Name}</p>
            <p>Father: {studentInfo.FatherName}</p>
            <p>Number: {studentInfo.StudentNo}</p>
            <p>Address: {studentInfo.Address}</p>
            <p>Email: {studentInfo.Email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
