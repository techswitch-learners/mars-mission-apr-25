import React from "react";
import "./NavBar.scss";
import { Link } from "react-router";


export default function NavBar() {
  return (
    <div>
      <header className="navBarHeader">
        <nav className="navBarContainer">
          <div>
            <Link to="/" className="homeButton" id="homeLink">
              <img src="./Images/Earth.avif" alt="cartoon earth illustration" />
              Home
            </Link>
          </div>
          <div>
            <Link to="profile" className="profilePageButton" id="profileLink">
              <img
                src="./Images/Astro.avif"
                alt="cartoon astronaut illustration"
              />
              Profile
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}
