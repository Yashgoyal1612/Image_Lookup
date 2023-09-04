// App.js
import React, { useState } from 'react';
import './App.css';
import studentData from './StudentData';

function App() {
  const [roll, setRoll] = useState(""); // Default roll number for testing
  const [studentInfo, setStudentInfo] = useState(null); // State to store student information

  const getRollNo = (e) => {
    const studentRoll = e.target.value;
    setRoll(studentRoll);
  }

  const findStudentInfo = () => {
    const student = studentData.find((student) => student.UnivRollNo === parseInt(roll));
    if (student) {
      setStudentInfo(student);
    } else {
      setStudentInfo("Not Available");
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
        <input
          type="number"
          placeholder='Enter University Roll No.'
          onChange={getRollNo}
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
