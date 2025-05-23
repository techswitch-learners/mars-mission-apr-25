import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhotoOfTheDay from "./Components/photoOfTheDay/photoOfTheDay";
import RoverImages from "./Components/RoverImages/RoverImages";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoverImages name="curiosity" />} />
      </Routes>
    </Router>
  );
}

export default App;
