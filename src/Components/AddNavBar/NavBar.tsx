import React from "react";
import "./NavBar.scss";
import { Link } from "react-router";

export default function NavBar() {
  return (
    <div>
      <header className="navBarHeader">
        <nav className="navBarContainer">
          <div>
            <Link to="/" className="homeButton">
              <img src="./Images/earth_318-581287.avif" />
              Home
            </Link>
          </div>
          <div>
            <Link to="profile" className="profilePageButton">
              <img src="Images/cute-astronaut-standing-cartoon-vector-icon-illustration-science-technology-icon-concept-isolated_138676-8961.avif" />
              Profile
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}
