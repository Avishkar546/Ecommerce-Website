import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <p className='text-center'>&copy; All rights are reserved</p>
        <p className='text-center '>
          <Link to="/About">About</Link>
          |
          <Link to="/Contact">Contact</Link>
          |
          <Link to="/Policy">Policy</Link>
        </p>
      
      </div>
    </>
  )
}

export default Footer
