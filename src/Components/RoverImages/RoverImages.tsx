import React, { useState, useEffect, CSSProperties } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RoverImages.scss";
import { ClipLoader } from "react-spinners";

type RoverResponse = {
  id: number;
  img_src: string;
};

type Cameras = string[];

const api = "fCp5fNsscdDmov0Vw4lpU4bOkdMTCuCA9tnoKgYH";

function RoverImages(props: { name: string }) {
  const [roverResponse, setRoverResponse] = useState<RoverResponse[]>();
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [latestCameras, setLatestCameras] = useState<Cameras>();
  const [selectedValue, setSelectedValue] = useState<string>("");

  const altText = `Photo taken by the Mars Rover ${props.name}`;

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
          `https://api.nasa.gov/mars-photos/api/v1/manifests/${props.name}?api_key=${api}`,
        );
        const manifestData = await manifestResponse.json();
        setLatestCameras(
          manifestData.photo_manifest.photos[
            manifestData.photo_manifest.photos.length - 1
          ].cameras,
        );

        if (!selectedValue) {
          setLoading(true);
          const photoResponse = await fetch(
            `https://api.nasa.gov/mars-photos/api/v1/rovers/${props.name}/photos?earth_date=${manifestData.photo_manifest.max_date}&api_key=${api}`,
          );
          const photoData = await photoResponse.json();
          setRoverResponse(photoData.photos);
          setLoading(false);
        } else {
          setLoading(true);
          const photoResponse = await fetch(
            `https://api.nasa.gov/mars-photos/api/v1/rovers/${props.name}/photos?earth_date=${manifestData.photo_manifest.max_date}&camera=${selectedValue}&api_key=${api}`,
          );
          const photoData = await photoResponse.json();
          setRoverResponse(photoData.photos);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred.",
        );
      }
    };

    fetchData();
  }, [props.name, selectedValue]);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedValue(e.target.value);
  };

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
  } else {
    return (
      <div className="sliderContainer">
        <Slider {...sliderSettings}>
          {roverResponse.map((image) => (
            <img key={image.id} src={image.img_src} alt={altText} />
          ))}
        </Slider>
        <select
          id="cameraDropdown"
          value={selectedValue}
          onChange={handleChange}
        >
          {latestCameras?.map((camera, index) => (
            <option key={index} value={camera}>
              {camera}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default RoverImages;
