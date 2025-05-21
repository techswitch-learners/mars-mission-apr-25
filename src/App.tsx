import React from "react";
import "./App.scss";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import PhotoOfTheDay from './Components/photoOfTheDay'


function App() {
  return (
<Router>
        <Routes>
            <Route path = "/" element = {<PhotoOfTheDay/>}/>
        </Routes>
</Router>
  )
}

export default App;
