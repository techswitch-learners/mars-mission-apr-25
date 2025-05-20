import React, { useEffect, useState } from "react";
import { data } from "react-router";
import "./photoOfTheDay.scss";


export default function PhotoOfTheDay () {

    const [photo, setPhoto] = useState<string>()
    const [title, setTitle] = useState<string>()
    const [explanation,setExplanation] = useState<string>()

    useEffect (() => {
        fetch("https://api.nasa.gov/planetary/apod?api_key=5s0C1UhCZLh3WVVN2kGzF1kEw76CImpsBBf3AvEy")
        .then(response => 
            response.json())
            .then(data => {setPhoto(data.hdurl) 
                setTitle(data.title)
                setExplanation(data.explanation)
                 console.log(data)

            //setMyData(data.results)
            })
    .catch(error => console.error("error", error))}, []);
     const photoData= data

return ( 
<div>
        <div className="photoOfTheDayContainer">
            <img src={photo} className="photo-of-the-day" width="100%" alt-text={title} />
            
        </div>
        <div className="explanation">
        {explanation}
        </div>
</div>
)

}
