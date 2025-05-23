import React from "react";
import { useState } from "react";
import MissionManifest from "../MissionManifest/MissionManifest";
import spiritButton from "../../Assets/Images/spirit_button.png";
import curiosityButton from "../../Assets/Images/curiosity_button.png";
import opportunityButton from "../../Assets/Images/Opportunity_button.png";
import "./RoverDetails.scss";
import RoverImages from "../RoverImages/RoverImages";

export enum Rovers {
  CURIOSITY = "curiosity",
  OPPORTUNIY = "opportunity",
  SPIRIT = "spirit",
}

export interface MissionManifestProps {
  roverType: Rovers;
}

function RoverDetails() {
  const [rover, setRover] = useState<Rovers>(Rovers.SPIRIT);
  const [selectedRover, setSelectedRover] = useState<Rovers>(Rovers.SPIRIT);

  const handleClick = (id: string) => {
    if (id === "spirit-button") {
      setRover(Rovers.SPIRIT);
      setSelectedRover(Rovers.SPIRIT);
    } else if (id === "curiosity-button") {
      setRover(Rovers.CURIOSITY);
      setSelectedRover(Rovers.CURIOSITY);
    } else if (id === "opportunity-button") {
      setRover(Rovers.OPPORTUNIY);
      setSelectedRover(Rovers.OPPORTUNIY);
    }
  };

  return (
    <div id="rover-information-container">
      <h2 id="rover-header">CHOOSE A ROVER</h2>
      <span id="scroll-message">Scroll to pick!</span>
      <div id="rover-button-container" className="button-carousel">
        <button
          className={
            selectedRover === "spirit" ? "selected-rover" : "not-selected"
          }
          id="spirit-button"
          key="spirit-button"
          onClick={() => handleClick("spirit-button")}
        >
          <img src={spiritButton} />
          <span>SPIRIT</span>
        </button>
        <button
          className={
            selectedRover === "curiosity" ? "selected-rover" : "not-selected"
          }
          id="curiosity-button"
          key="curiosity-button"
        >
          <img
            src={curiosityButton}
            onClick={() => handleClick("curiosity-button")}
          />
          <span>CURIOSITY</span>
        </button>
        <button
          className={
            selectedRover === "opportunity" ? "selected-rover" : "not-selected"
          }
          id="opportunity-button"
          key="opportunity-button"
        >
          <img
            src={opportunityButton}
            onClick={() => handleClick("opportunity-button")}
          />
          <span>OPPORTUNITY</span>
        </button>
      </div>
      <MissionManifest roverType={rover} />
      <RoverImages roverType={rover} />
    </div>
  );
}

export default RoverDetails;
