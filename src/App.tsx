import React from "react";
import "./App.scss";
import { useState } from "react";
import MissionManifest, {
  rovers,
} from "./Components/MissionManifest/MissionManifest";

function App() {
  const [rover, setRover] = useState<rovers>(rovers.SPIRIT);

  return <MissionManifest roverType={rover} />;
}

export default App;
