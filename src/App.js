import './App.css';
import { useState } from 'react';

function App() {
  const [roll, setRoll] = useState("201500815");

  const getRollNo = (e) => {
    const studentRoll = e.target.value;
    setRoll(studentRoll);
  }

  const link = `https://glauniversity.in:8103/${roll}.jpg`;

  return (
    <div className="container">
      <h1>Student Image Lookup</h1>
      <input
        type="number"
        placeholder='Enter University Roll No.'
        onChange={getRollNo}
      />
      <div className="image">
        <img src={link} alt="" />
      </div>
    </div>
  );
}
export default App;