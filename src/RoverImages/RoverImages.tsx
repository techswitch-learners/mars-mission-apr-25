import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './RoverImages.scss';
import { RotatingLines } from "react-loader-spinner";

type RoverResponse = {
    id: number,
    img_src: string
}

// const api = 'xOUmOAqBfy1xqdax0jmNOSp03vTzpULM6Bl1GLXE';
// const api = 'ffiSxDvu6k6PrMaGjIkoHGXNBaZMWFwqmOBIe2cZ'
const api = 'fCp5fNsscdDmov0Vw4lpU4bOkdMTCuCA9tnoKgYH'

function RoverImages(props: { name: string }) {
    const [roverResponse, setRoverResponse] = useState<RoverResponse[]>();
    const [latestPhotoDate, setLatestPhotoDate] = useState<string>("");
    const [latestCameras, setLatestCameras] = useState<[]>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    useEffect(() => {
    const fetchData = async () => {
        try {
        setLoading(true)    
        const manifestResponse = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${props.name}?api_key=${api}`);
        const manifestData = await manifestResponse.json();
        console.log(manifestData)
        setLatestPhotoDate(manifestData.photo_manifest.max_date);
        setLatestCameras(manifestData.photo_manifest.photos[manifestData.photo_manifest.photos.length - 1].cameras);

        const photoResponse = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${props.name}/photos?earth_date=${manifestData.photo_manifest.max_date}&api_key=${api}`);
        const photoData = await photoResponse.json();

        setRoverResponse(photoData.photos);
        setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
                setError(error instanceof Error ? error.message : "An unknown error occurred.");
            }
        };

  fetchData();
}, [props.name]); 
    

    if (error) {
        return (
            <div>
                <p className="error">Sorry, there's been an error with the page, please try again later!</p>
            </div>
        )
    }
    if (isLoading == true && !roverResponse) {
        return (
           <div className="sliderContainer">
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </div>
        )
    }
    else if (roverResponse) {
        return (
            <div className="sliderContainer">
                <Slider {...settings}>
                {roverResponse.map((image) => (
                    <img key={image.id} src={image.img_src} />
                ))}
                </Slider>
            </div>
            
        )
    }
}

export default RoverImages;
