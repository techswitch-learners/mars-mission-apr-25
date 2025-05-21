import React from "react";
import { useEffect } from "react";
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
import { format } from "path";
import './profilePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


    const API_KEY = "qUubKrhKBBrb0M4uQISHm089PavbKEcLW3v7tgiP";




export default function ProfilePage() {
    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<Date | null>(new Date());
    const [showProfile, setShowProfile] =useState<boolean>(false)
    const [roverPhotoUrls, setRoverPhotoUrls] = useState<string[]>([]);

    const earthDate = dayjs(date).format('YYYY-M-D');
    console.log("DATE:",date);
    console.log("EARTHDATE",earthDate);
    const handleClick = () => {
        setShowProfile(true)
        console.log(`Name: ${name}, Date: ${earthDate}`);
         const curiosityStartDate = new Date("2012-08-06");
         if (date && date >= curiosityStartDate) {
             getRoverPhotos().then(roverPhotos => setRoverPhotoUrls(roverPhotos));
         } else {
             setRoverPhotoUrls([]);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
    }

    const calculateAge = (date: Date) => {
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear()
       
        var m = today.getMonth() - date.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < date.getDate())) 
        {
            age--;
        }
        return age
    }
    const age = date ? calculateAge(date) : 0;
    const marsAge = Math.round(age / 1.88);
     
    async function getRoverPhotos (): Promise<string[]> {
        const fetchImages = await fetch (`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDate}&api_key=${API_KEY}`)
        console.log(fetchImages);
        const imagesData = await fetchImages.json();
        let roverPhotos = [];
        const roverPhotoCarouselLength = Math.min(imagesData.photos.length, 25)
        if (imagesData.photos.length !== 0) {
            for (let i = 0; i < roverPhotoCarouselLength; i++)
           roverPhotos.push(imagesData.photos[i].img_src);
        }
        return roverPhotos;
    }

    //  useEffect(() => {
    //         getRoverPhotos()
    //         .then(roverPhotos => setRoverPhotoUrls(roverPhotos))
            
    // //     }, []
    // )
    
    return (
        <div className="mars-profile-page">
            <div className="profile-input-section">
                <h1>Create your Mars profile</h1>
                <label className="input-field" htmlFor="name">
                    <p>Name: </p>
                    <input type="text" name="name" onChange={handleChange}required></input>
                </label>

                <label className="input-field" htmlFor="birthday">
                    <p>Birthday: </p>
                    <DatePicker selected={date} onChange={(date) => setDate(date)}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    showYearDropdown
                    scrollableMonthYearDropdown/>
                </label>
                    <img className="profile-button-image" onClick={handleClick} src="https://www.pngall.com/wp-content/uploads/13/Mars-Planet-PNG-Cutout.png" alt="clickable picture of mars"/>
                    <p id="build-your-profile-button-text">Click on Mars to build your profile!</p>
            </div>
            {showProfile && (

                <div className="pop-up-profile-section">
                    <div className="profile-information">
                        <h2>Welcome to your Mars profile</h2>
                        <img  id= "profile-astronaut-picture"src="https://static.vecteezy.com/system/resources/previews/012/318/301/original/cute-astronaut-with-peaceful-hands-sitting-on-rocket-astronaut-icon-concept-flat-cartoon-style-suitable-for-web-landing-page-banner-flyer-sticker-card-vector.jpg"/>

                        Name: {name}
                        Age: {marsAge}
                        
                        <p>Did you know you would weigh 2.5 X less on Mars? This is because the gravity is weaker on Mars than on Earth as it is smaller!</p>
                        <p>On Earth you are <strong>{age} years old </strong>, but on Mars you would only be <strong>{marsAge} years old.</strong> This is because 1 year on Mars is roughly twice that on Earth. </p>
                    </div>

                    <div className="profile-rover-photos">
                        {roverPhotoUrls.length === 0 ? ( <h3> No photos available</h3>) : 
                            roverPhotoUrls.map((photo:string) => 
                            <img src={photo}/>
                        )}
                    </div>
                </div>
            )}
        </div>
        
    );

};
