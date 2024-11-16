import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Customer from './customer/Customer'
import Admin from "./admin/Admin"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/customer' element={<Customer/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
