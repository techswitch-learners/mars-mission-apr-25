import React from "react";
import "./NavBar.scss"
import { Link } from "react-router";


export default function NavBar() {
  return (
    <div >
      <header className="navBarHeader">
        <nav className="navBarContainer">
      <div>
        <Link to="/" className = "homeButton">Home</Link>
      </div>
      <div>
        <Link to="profile" className = "profilePageButton">Profile</Link>
      </div>
      </nav>
      </header>
      
    </div>
  );
}
