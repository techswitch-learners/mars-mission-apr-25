import React from "react";
import "./App.scss";
import {useState} from 'react';
import MissionManifest from "./Components/MissionManifest/MissionManifest";



function App() {
  const [rover, setRover] = useState("spirit");

  return (
  <MissionManifest roverName={rover} />
  );
}

export default App;
