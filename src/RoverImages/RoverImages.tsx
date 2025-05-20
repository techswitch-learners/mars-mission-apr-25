import React, { useState, useEffect } from "react";



// type roverProp = {
//     name: string;
// }

type roverResponse = {
    camera: {
        name: string;
    },
    img_src: string
}

// const api = 'xOUmOAqBfy1xqdax0jmNOSp03vTzpULM6Bl1GLXE';
// const api = 'ffiSxDvu6k6PrMaGjIkoHGXNBaZMWFwqmOBIe2cZ'
const api = 'fCp5fNsscdDmov0Vw4lpU4bOkdMTCuCA9tnoKgYH'

function RoverImages() {
//we can write logic to check the latest image dates 
    const [roverResponse, setRoverResponse] = useState<roverResponse[]>();
    const today = new Date();
    const dd = String(today.getDate() - 3);
    const mm = String(today.getMonth() + 1);
    const yyyy = String(today.getFullYear());
    const latestDate = `${yyyy}-${mm}-${dd}`;

    useEffect(() => {
        try {
        fetch (`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${latestDate}&api_key=${api}`)
        .then(response => response.json())
        .then(data => {
            setRoverResponse(data.photos)
        })

    }
    catch (err){
       console.log(err);
    }
    }, [latestDate])


    return (
        <div>
        {!roverResponse ? (
        <h2> sorry, nothing to display right now, check back later!</h2>
        ): ( roverResponse.map((image) => (
            <img src={image.img_src}/>
     ))
    )}
    </div>
    )
}

export default RoverImages;
