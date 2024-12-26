// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Loginreact";
import CapacityData from "./Components/CapacityData";
import BuildingDetail from "./Components/BuildingDetail";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route to the login page */}
          <Route path="/" element={<Login />} />
          {/* Route for capacity overview page */}
          <Route path="/capacity" element={<CapacityData />} />
          {/* Dynamic route for building details */}
          <Route path="/building/:name" element={<BuildingDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
