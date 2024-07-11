import React, { useState } from 'react'
import Navigation from './Navigation'
import { Link } from "react-router-dom"
import "../styles/home.css"
import profile from "../media/profile.webp"

export default function Home() {
  const [log, setLog] = useState(false)
  return  (
    <div className='home'>
      <div className="nav">
        <ul>
          <li>
            <Link to="/" >Home</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          {/* <li>
            <Link to="/about">about</Link>
          </li> */}
        </ul>
        <img src={profile} alt="" srcset="" />
      </div>

      <div className='main-content'>
        <p id='title'>AIRSELO</p>
        <p id='sub-title'>
          Designed to streamline and manage food services on flights

        </p>
      </div>


    </div>
  ) 
}
