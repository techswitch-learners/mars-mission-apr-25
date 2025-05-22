import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhotoOfTheDay from "./Components/photoOfTheDay/photoOfTheDay";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhotoOfTheDay />} />
      </Routes>
    </Router>
  );
}

export default App;
