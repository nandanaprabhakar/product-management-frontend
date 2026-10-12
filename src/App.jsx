import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ProductDetails from './Pages/ProductDetails'
import Login from './Pages/Login'
import Register from './Pages/Register'

function App() {

  return (
    <>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/productdetails/:id' element={<ProductDetails/>}/>
      </Routes>
    </>
  )
}

export default App
