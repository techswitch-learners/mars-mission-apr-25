import React from "react";
import "./App.scss";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <Router>
        <Routes>
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
