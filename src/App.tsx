import React from "react";
import "./App.scss";
import { useState } from "react";
import MissionManifest, {
  rovers,
} from "./Components/MissionManifest/MissionManifest";

function App() {
  return <MissionManifest roverType={rovers.OPPORTUNITY} />;
}

export default App;
