import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import City from './pages/City'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Signin from './pages/Signin'
import Login from './pages/Login'
import Flight from './pages/Flight'
import Payment from './pages/Payment'
import OrderSuccess from './pages/OrderSuccess';
import CityDetails from './pages/CityDetails'
import Tours from './pages/Tours'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/city" element={<City />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/city/:name" element={<CityDetails />} />
        <Route path="/flight" element={<Flight />} />
        <Route path="/payment/:price" element={<Payment />} />
        <Route path="/order/success/:orderId" element={<OrderSuccess />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
