import React from 'react'
import LandingPage from './VendorDashboard/pages/LandingPage'

import './App.css'
import { Routes,Route } from 'react-router-dom'
import Navbar from './VendorDashboard/components/Navbar'
import Login from './VendorDashboard/components/forms/Login'
import NotFound  from './VendorDashboard/components/NotFound'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/*' element={<NotFound/>}/>
       

     
      </Routes>
     
    
    </div>
  )
}

export default App 