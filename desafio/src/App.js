import './App.css';
import React from 'react';
import SideBar from './Components/SideBar/SideBar'
import Home from './Components/Home/Home';


function App() {
  return (
    <div className="App">
        <SideBar/>
        <Home/>
    </div>
  );
}

export default App;
