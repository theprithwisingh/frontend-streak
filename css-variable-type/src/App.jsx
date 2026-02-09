import React from "react"
// import './App.css'
import Navbar from "./components/Navbar"
import Profile from "./components/Profile"
import Footer from "./components/Footer"

function App() {
  console.log("render app")
  return(
    <>
      
     <Navbar/>
     <Profile/>
     <Footer/>
    </>
  )
}

export default App
