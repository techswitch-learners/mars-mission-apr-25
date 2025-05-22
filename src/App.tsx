import React from "react";
import "./App.scss";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router";
import PhotoOfTheDay from "./Components/photoOfTheDay/photoOfTheDay";
import ProfilePage from "./pages/Profile/ProfilePage";

function App() {
  return (
    <Router>
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
  );
}

export default App;
