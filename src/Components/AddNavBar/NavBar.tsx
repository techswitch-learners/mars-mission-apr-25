import React from "react";
import "./NavBar.scss";
import { Link } from "react-router";
import imageAstro from "./Images/astronautcartoon.png";
import imageEarth from "./Images/cartoon earth.png";

export default function NavBar() {
  return (
    <div>
      <header className="navBarHeader">
        <nav className="navBarContainer">
          <div>
            <Link to="/" className="homeButton" id="homeLink">
              <img src={imageEarth} alt="imageEarth" id="earthButton" />
              Home
            </Link>
          </div>
          <div>
            <Link to="/profile" className="profilePageButton" id="profileLink">
              <img
                src={imageAstro}
                alt="cartoon astronaut illustration"
                id="astroButton"
              />
              Profile
            </Link>
          </div>
        </nav>
      </header>
      <div className="stars"></div>
    </div>
  );
}
