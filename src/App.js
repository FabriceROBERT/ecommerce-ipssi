// src/App.js
import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { UserProvider } from "./components/userContext";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <UserProvider>
      
      <Router>
        <Routes>
          <Route path="/login" element = {<LoginPage />} />
          <Route path="/dashboard" element = {<Dashboard />} />
          <Route path="/" element = {<HomePage />} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
