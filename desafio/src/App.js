import './App.css';
import React from 'react';
import SideBar from './Components/SideBar/SideBar'
import Home from './Pages/Home/Home';
import { RadioProvider } from './Context/RadioContext';
import RadioForm from './Components/RadioForm/RadioForm';


function App() {
  return (
        <RadioProvider>
          <div className="App">
            <SideBar/>
            <Home/>
            <RadioForm/>
          </div>
        </RadioProvider>
  );
}

export default App;
