import React from "react";
import "./App.scss";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import RoverImages from "./RoverImages/RoverImages"

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element = {<RoverImages name='curiosity'/>}></Route>
        </Routes>    
      </Router>
    </>
  );
}

export default App;
