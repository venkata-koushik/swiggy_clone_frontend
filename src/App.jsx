import LandingPage from './VendorDashboard/pages/LandingPage'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import NotFound from './VendorDashboard/components/NotFound'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
