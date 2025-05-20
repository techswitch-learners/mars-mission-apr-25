import React, { useEffect, useState } from "react";
import { data } from "react-router";
import "./photoOfTheDay.scss";
//import dayjs from 'dayjs';


export default function PhotoOfTheDay () {

    const [photo, setPhoto] = useState<string>()
    const [title, setTitle] = useState<string>()
    const [explanation,setExplanation] = useState<string>()


    // let day = dayjs().date()
    // let month = dayjs().month()+1
    // let year= dayjs().year()

    // console.log (year & month & day)

    // date={year}-{month}-{day}


    // if data.mediatype != "image" && day > 1
    // {
    //     day -=1
    // }


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
        {photo ? (
            <img src={photo} className="photo-of-the-day" alt-text={title} />
            )
     : (<p> Display Video </p>)}
    </div>
        <div className="explanation">
        {explanation}
        </div>
</div>
)

}
