import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import './SideBar.css'

const SideBar = () => {
  return (
    <div className='sidebar'>
        <button><GiHamburgerMenu /></button>
        <div className="psq">
          <input type='text' value='' placeholder='Search here'></input>
        </div>
    </div>
  )
}

export default SideBar
