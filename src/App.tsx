import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/AddNavBar/NavBar";
import "./App.scss";
import PhotoOfTheDay from "./Components/photoOfTheDay/photoOfTheDay";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavBar/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
