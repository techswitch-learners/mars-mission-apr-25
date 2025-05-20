import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import './RoverImages.scss';

type RoverResponse = {
    id: number,
    img_src: string
}

// const api = 'xOUmOAqBfy1xqdax0jmNOSp03vTzpULM6Bl1GLXE';
// const api = 'ffiSxDvu6k6PrMaGjIkoHGXNBaZMWFwqmOBIe2cZ'
const api = 'fCp5fNsscdDmov0Vw4lpU4bOkdMTCuCA9tnoKgYH'

function RoverImages(props: {name: string}) {
    const [roverResponse, setRoverResponse] = useState<RoverResponse[]>();
    const [latestPhotoDate, setLatestPhotoDate] = useState<string>();
    const [latestCameras, setLatestCameras] = useState<[]>();
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        try {
        fetch (`https://api.nasa.gov/mars-photos/api/v1/manifests/${props.name}?api_key=${api}`)
        .then(response => response.json())
        
        .then(data => {
            setLatestPhotoDate(data.photo_manifest.max_date)
            setLatestCameras(data.photo_manifest.photos[data.photo_manifest.photos.length -1].cameras)
        })
    }
    catch (err){
       console.log(err);
    }
    console.log(latestPhotoDate)
}, [])


      useEffect(() => {
        if(latestPhotoDate){
      try {
        fetch (`https://api.nasa.gov/mars-photos/api/v1/rovers/${props.name}/photos?earth_date=${latestPhotoDate}&api_key=${api}`)
        .then(response => response.json())
        .then(data => {
            setRoverResponse(data.photos)
            setLoading(false)
        })
    }
    catch (err){
       console.log(err);
    }
    } }, [latestPhotoDate])

    return (
        //this needs to display loading first then nothing to display otherwise 
        <ul>
            {!roverResponse ? (
            <h2> Loading...!</h2>
            ): 
            ( roverResponse.map((image) => (
                <li>
                    <img key= {image.id} src={image.img_src} />
                </li>    
            ))
        )   
        }
       </ul>
    )
}

export default RoverImages;
