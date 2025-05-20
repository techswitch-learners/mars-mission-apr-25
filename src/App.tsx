import React from "react";
import "./App.scss";
import MissionManifest from "./MissionManifest/MissionManifest";
import {useState} from 'react';


function App() {
  const [rover, setRover] = useState('Spirit');

  return (
  <MissionManifest roverName={rover} />
  );
}

export default App;
