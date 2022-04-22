import { useState } from 'react'
import './assets/index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout'
import Home from './pages/Home'
import Sells from './pages/Sells'
import Items from './pages/Items'
import Users from './pages/Users'
import NotFound from './pages/NotFound';
// import { IconName } from "react-icons/io5";

function App() {
  const [count, setCount] = useState(0)

  return (    
    <BrowserRouter>
    <MainLayout>
    <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/items' element={<Items/>} />
        <Route exact path='/sells' element={<Sells/>} />
        <Route exact path='/users' element={<Users/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </MainLayout>
    </BrowserRouter>
  )
}

export default App
