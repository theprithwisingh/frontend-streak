import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <>
      <p>hello world</p> 
      <Link to="/login"><p>login</p></Link>
       <Link to="/register"><p>register</p></Link>
    </>
  )
}

export default Landing