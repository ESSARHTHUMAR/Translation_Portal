import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Client from './customer/Client'
import Admin from "./admin/Admin"
import Navbar from "./components/Navbar"
import Home from "./components/Home"

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/client' element={<Client/>}/>
          <Route path='/admin' element={<Admin/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
