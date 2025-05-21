import React from "react";
import "./App.scss";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
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
      </header> */}

      <Router>
        <Routes>
          <Route path="/Profile/ProfilePage" 
                 element={<ProfilePage/>}/>
          <Route path="*" 
                element ={<div>Sorry, that page doesn't exist, try these: 
                  <div>
                    <Link to ="/Profile/ProfilePage">Profile Page</Link>
                    </div>
                </div>}/>
        </Routes>
      </Router>


    </div>
  );
}

export default App;
