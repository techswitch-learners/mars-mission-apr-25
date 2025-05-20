import React, { useEffect, useState } from "react";
import { data } from "react-router";
import "./photoOfTheDay.scss";


export default function PhotoOfTheDay () {

    const [photo, setPhoto] = useState<string>()
    const [title, setTitle] = useState<string>()
    const [explanation,setExplanation] = useState<string>()

    const fallBackImageDates = ["2025-05-08" , "2025-05-13", "2025-04-24" , "2025-03-26" , "2025-04-13" , "2025-03-23" , "2025-01-15" , "2024-11-10" , "2024-03-22" , "2023-08-10"]
    let photoAddress = "https://api.nasa.gov/planetary/apod?date=2025-05-19&api_key=5s0C1UhCZLh3WVVN2kGzF1kEw76CImpsBBf3AvEy"

    const randomFromZeroToNine = Math.floor(Math.random() * 10);



    useEffect (() => {
        fetch(photoAddress)
        .then(response => 

            response.json())

            .then(  data => { setPhoto(data.hdurl) 
                            setTitle(data.title)
                            setExplanation(data.explanation)
                          

                        if (!data.hdurl){
                        photoAddress =  "https://api.nasa.gov/planetary/apod?date=" + fallBackImageDates[randomFromZeroToNine] + "&api_key=5s0C1UhCZLh3WVVN2kGzF1kEw76CImpsBBf3AvEy"  
                    console.log(photoAddress) 
               
                        fetch(photoAddress)
                        .then(response => 

                        response.json())

                        .then(data => { setPhoto(data.hdurl) 
                                        setTitle(data.title)
                                        setExplanation(data.explanation)}
            // setMyData(data.results)
                                        }
            
    // .catch(error => console.error("error", error))}, []);
    //  const photoData= data)
        
return ( 
<div>
        <div className="photoOfTheDayContainer">
            <img src={photoAddress} className="photo-of-the-day" width="100%" alt-text={title}/>
            
        </div>
        <div className="explanation">
        {explanation}
        </div>
</div>
)

}
