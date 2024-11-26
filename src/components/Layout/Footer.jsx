import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    // <div className='bg-dark text-light p-3'>
    //   <h4 className='text-center'>
    //     All Rights Reserved &copy;
    //   </h4 >
    // </div>
    <div className='footer'>
      <h4 className='text-center'>
        All Rights &copy; Reserved
      </h4>
      <p className='text-center mt-3'>
        <Link to="/about" >About</Link>|<Link to="/Contact">Contact</Link>|<Link to="/policy">Privacy policy</Link>
      </p>
    </div>
  )
}

export default Footer