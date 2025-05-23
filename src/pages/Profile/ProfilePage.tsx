import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import "./ProfilePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const API_KEY = "qUubKrhKBBrb0M4uQISHm089PavbKEcLW3v7tgiP";

export default function ProfilePage() {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [roverPhotoUrls, setRoverPhotoUrls] = useState<string[]>([]);
  const [message, setMessage] = useState<string>(
    "These are the photos taken by the 'Curiosity' Rover on your birthday!",
  );
  const curiosityStartDate = new Date("2012-08-06");
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleClick = () => {
    setShowProfile(true);
    getRoverPhotos().then((roverPhotos) => setRoverPhotoUrls(roverPhotos));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const calculateAge = (date: Date) => {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();

    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    return age;
  };
  const age = date ? calculateAge(date) : 0;
  const marsAge = Math.round(age / 1.88);

  async function getRoverPhotos(): Promise<string[]> {
    let earthDate = dayjs(date).format("YYYY-M-D");
    if (date && date < curiosityStartDate) {
      earthDate = dayjs(curiosityStartDate).format("YYYY-M-D");

      setMessage(
        "Uh Oh! You're older than the Curiosity Rover, so there are no photos available. Here are the first images taken by the Curiosity Rover.",
      );
    } else {
      earthDate = dayjs(date).format("YYYY-M-D");
    }
    const fetchImages = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDate}&api_key=${API_KEY}`,
    );
    const imagesData = await fetchImages.json();
    const roverPhotos = [];
    const roverPhotoCarouselLength = Math.min(imagesData.photos.length, 25);
    if (imagesData.photos.length !== 0) {
      for (let i = 0; i < roverPhotoCarouselLength; i++)
        roverPhotos.push(imagesData.photos[i].img_src);
    } else {
      setMessage(
        "The date of the first pictures taken by the Curiosity Rover is 06/08/2012",
      );
    }
    return roverPhotos;
  }

  return (
    <div className="mars-profile-page">
      <div className="profile-input-section">
        <h1>Create your Mars profile</h1>
        <label className="input-field" htmlFor="name">
          <p>Name: </p>
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Enter your name here"
            required
          ></input>
        </label>

        <label className="input-field">
          <p>Birthday: </p>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            showYearDropdown
            scrollableMonthYearDropdown
            placeholderText="Select your birthday"
          />
        </label>
        <img
          className="profile-button-image"
          onClick={handleClick}
          src="https://www.pngall.com/wp-content/uploads/13/Mars-Planet-PNG-Cutout.png"
          alt="clickable button of mars"
        />
        <p id="build-your-profile-button-text">
          Click on Mars to build your profile!
        </p>
      </div>
      {showProfile && (
        <div className="pop-up-profile-section">
          <div className="profile-information">
            <h2>Welcome to your Mars profile</h2>
            <div className="side-by-side-information">
              <div className="name-and-age-profile">
                <h3>
                  <strong>Name:</strong> {name}
                </h3>
                <h3>
                  <strong>Age on Earth:</strong> {age}
                </h3>
                <h3>
                  <strong>Age on Mars:</strong> {marsAge}
                </h3>
              </div>
              <img
                id="profile-astronaut-picture"
                alt="astronaut"
                src="https://static.vecteezy.com/system/resources/previews/010/938/481/original/cute-astronaut-floating-space-cartoon-vector.jpg"
              />
            </div>
          </div>

          <div className="profile-fun-facts">
            <p>
              Did you know you would weigh 2.5x less on Mars? This is because
              the gravity is weaker on Mars than on Earth as it is smaller!
            </p>
            <p>
              On Earth you are <strong>{age} years old </strong>, but on Mars
              you would only be <strong>{marsAge} years old.</strong> This is
              because 1 year on Mars is roughly twice that on Earth.
            </p>
          </div>

          <div className="profile-rover-photos">
            <Slider {...settings}>
              {roverPhotoUrls.length === 0 ? (
                <p>
                  Sorry there are no available photos on your birthday, try a
                  different day.
                </p>
              ) : (
                roverPhotoUrls.map((photo: string, index) => (
                  <img
                    className="rover-images-from-API"
                    src={photo}
                    key={index}
                    alt="Mars"
                  />
                ))
              )}
            </Slider>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
