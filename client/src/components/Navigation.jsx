import React from 'react'
import "../styles/navigation.css"
import {Link} from 'react-router-dom'

export default function Navigation() {
  return (
    <nav className='navigation'>
      <p>AIRSELO</p>
      <ul>
        <li>
          <Link to="/" >Home</Link>
        </li>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
      </ul>
    </nav>
  )
}
