import React from "react";
import "./App.scss";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router";
// import ProfilePage from "./Components/ProfilePage";
// import PhotoOfTheDay from "./Components/photoOfTheDay/photoOfTheDay";
import RoverImages from "./Components/RoverImages/RoverImages";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<PhotoOfTheDay />} />
        <Route path="/profile" element={<ProfilePage />} /> */}
        <Route path="/" element={<RoverImages name="curiosity" />} />
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
  );
}

export default App;
