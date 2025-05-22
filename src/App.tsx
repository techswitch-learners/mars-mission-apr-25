import React from "react";
import "./App.scss";
import RoverDetails from "./Components/RoverDetails/RoverDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhotoOfTheDay from "./Components/photoOfTheDay/photoOfTheDay";

function App() {
  return <RoverDetails />;
}

export default App;
