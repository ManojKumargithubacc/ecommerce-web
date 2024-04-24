import React from 'react'
import {NavLink} from 'react-router-dom'

function Footer() {
  return (
    <div className="footer">
      <h4 className='text-center'>All rights reserved &copy; E-MART</h4>
      <p className='text-center mt-3'>
        <NavLink to="/about">About</NavLink>|
        <NavLink to="/contact">Contact</NavLink>|
        <NavLink to="/policy">Privacy Policy</NavLink>
      </p>
    </div>
  )
}

export default Footer
