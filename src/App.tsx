import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/home/Home'
import './App.css'
import NavBar from './pages/navbar/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='navbar'><NavBar/></div>
      <Home
        title="Título"
        description='Descrição'/>
    </>
  )
}

export default App
