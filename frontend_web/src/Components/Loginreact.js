import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginreact.css";

function Login() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/capacity");
  };

  return (
    <div className="login-container">
      <h1>Welcome to the Building Capacity Tracker</h1>
      <button className="login-button" onClick={handleLoginClick}>
        Enter
      </button>
    </div>
  );
}

export default Login;
