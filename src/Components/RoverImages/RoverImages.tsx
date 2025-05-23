import React, { useState, useEffect, CSSProperties } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RoverImages.scss";
import { ClipLoader } from "react-spinners";
import { MissionManifestProps, rovers } from "../RoverDetails/RoverDetails";

type RoverResponse = {
  id: number;
  img_src: string;
};

const apiKey = process.env.REACT_APP_API_KEY;

function RoverImages(props: MissionManifestProps) {
  const [roverResponse, setRoverResponse] = useState<RoverResponse[]>();
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const altText = `Photo taken by the Mars Rover ${props.roverType}`;

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "gray",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const manifestResponse = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/manifests/${props.roverType}?api_key=${apiKey}`,
        );
        const manifestData = await manifestResponse.json();

        const photoResponse = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${props.roverType}/photos?earth_date=${manifestData.photo_manifest.max_date}&api_key=${apiKey}`,
        );
        const photoData = await photoResponse.json();

        setRoverResponse(photoData.photos);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred.",
        );
      }
    };

    fetchData();
  }, [props.roverType]);

  let firstLetter = props.roverType.charAt(0).toUpperCase;


  if (error) {
    return (
      <div>
        <p className="error">
          Sorry, there&apos;s been an error with the page, please try again
          later!
        </p>
      </div>
    );
  }
  if (!roverResponse) {
    return (
      <div className="sliderContainer">
        <ClipLoader
          loading={isLoading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  } else if (props.roverType === rovers.CURIOSITY) {
    return (
      <div className="sliderContainer">
        <Slider {...sliderSettings}>
          {roverResponse.map((image) => (
            <img key={image.id} src={image.img_src} alt={altText} />
          ))}
        </Slider>
      </div>
    );
  } else {
    return <h2>Sorry no images taken by the rover today. <br/> The rover's mission has been completed! </h2>
  }
}

export default RoverImages;
