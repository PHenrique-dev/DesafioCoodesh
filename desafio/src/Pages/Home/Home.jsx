import React from 'react'
import './Home.css'
import { FaSearch } from "react-icons/fa";
import List from '../../Components/List/List';


const Home = () => {
  return (
    <div className='home'>
        <div className="title">
            <h1>Radio Browser</h1>
        </div>
        <div className="filtros">
            <p>FAVORITE RADIOS</p>
            <button><FaSearch /></button>
            <input type='text' value='' placeholder='Search stations'></input>
        </div>
        <div className="lista">
          <List/>
        </div>
    </div>
  )
}

export default Home
