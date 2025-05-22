import React from "react";
import "./App.scss";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router";
import PhotoOfTheDay from "./Components/photoOfTheDay/photoOfTheDay";
import ProfilePage from "./pages/Profile/ProfilePage";
import NavBar from "./Components/AddNavBar/NavBar";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<PhotoOfTheDay />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="*"
            element={
              <div>
                Sorry, that page does not exist, try these:
                <div>
                  <Link to="/profile">Profile Page</Link>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
