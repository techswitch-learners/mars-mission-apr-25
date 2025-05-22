import { useState } from "react";
import { useEffect } from "react";
import { config } from "dotenv";
import { json } from "stream/consumers";
import "./MissionManifest.scss";

export enum rovers {
  CURIOSITY = "curiosity",
  OPP = "opportunity",
  SPIRIT = "spirit",
}

export interface MissionManifestProps {
  roverType: rovers;
}

type manifestData = {
  name: string;
  landingDate: string;
  launchDate: string;
  status: string;
  maxSol: number;
  maxDate: string;
  totalPhotos: number;
};

function MissionManifest(props: MissionManifestProps) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [manifestData, setManifestData] = useState<manifestData | null>(null);

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/manifests/${props.roverType}?api_key=${apiKey}`,
    )
      .then((response) => response.json())
      .then((response) => {
        const data = response.photo_manifest;
        setManifestData({
          name: data.name,
          landingDate: data.landing_date,
          launchDate: data.launch_date,
          status: data.status,
          maxSol: data.max_sol,
          maxDate: data.max_date,
          totalPhotos: data.total_photos,
        });
      });
  }, [props.roverType]);

  if (!manifestData) {
    return <p>Loading...</p>;
  } else {
    return (
      <div
        id="mission-manifest-container"
        data-testid="mission-manifest-container"
      >
        <h2>MISSION MANIFEST</h2>
        <div id="rover-mission-info-container">
          <p className="manifest-fieldname">Rover Name: </p>
          <p>{manifestData.name ?? "N/A"}</p>
          <p className="manifest-fieldname">Landing Date: </p>
          <p>{manifestData.landingDate ?? "N/A"}</p>
          <p className="manifest-fieldname">Launch Date: </p>
          <p>{manifestData.launchDate ?? "N/A"}</p>
          <p className="manifest-fieldname">Status: </p>
          <p>{manifestData.status ?? "N/A"}</p>
          <p className="manifest-fieldname">Max Sol: </p>
          <p>{manifestData.maxSol ?? "N/A"}</p>
          <p className="manifest-fieldname">Max Date: </p>
          <p>{manifestData.maxDate ?? "N/A"}</p>
          <p className="manifest-fieldname">Total photos: </p>
          <p>{manifestData.totalPhotos ?? "N/A"}</p>
        </div>
      </div>
    );
  }
}

export default MissionManifest;
