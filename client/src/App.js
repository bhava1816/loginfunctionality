import './App.css';
import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './components/Login';
import Signup from './components/Signup'
import Dashboard from './components/Dashboard';
import Helpdesk from './components/Helpdesk';
import Contact from './components/Contact';


function App() {
  return (
    <div>
     <BrowserRouter>
     <Routes>
    <Route path='/' element={<Login></Login>}></Route>
    <Route path='/signup' element={<Signup></Signup>}></Route>
    <Route path='/dashboard' element={<Dashboard/>}></Route>
    <Route path='/helpdesk' element={<Helpdesk/>}></Route>
    <Route path='/contact' element={<Contact/>}></Route>
    <Route path='/signout' element={<Login/>}></Route>
     </Routes>
     </BrowserRouter>
    
    
    </div>
  )
}

export default App
