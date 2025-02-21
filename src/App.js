import React from "react";
import Homepage from "./components/Homepage";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
// import Dashboard from "./components/TeacherDashboard";
import Signup from "./components/Signup";
import ProtectedRoute from "./auth/ProtectedRoute";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/teacherdashboard" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/studentdashboard" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
