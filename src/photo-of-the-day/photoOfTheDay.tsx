import React, { useEffect, useState } from "react";

type PhotoOfTheDay = {
    hdurl : string;
}

export default function PhotoOfTheDay () {

    const [photo, setPhoto] = useState<string>()

    useEffect (() => {
        fetch("https://api.nasa.gov/planetary/apod?api_key=5s0C1UhCZLh3WVVN2kGzF1kEw76CImpsBBf3AvEy")
        .then(response => 
            response.json())
            .then(data => {setPhoto(data.hdurl)
                 console.log(data)
            //setMyData(data.results)
            })
    .catch(error => console.error("error", error))}, []);


return ( 
        <div>
            <img src={photo} width="100%" />
        </div>

)

}
