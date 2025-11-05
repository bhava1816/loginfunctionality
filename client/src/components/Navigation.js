import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'

function Navigation() {
  let dispatch=useDispatch()
  const userdetails = useSelector((store) => store.details)
  const navigate = useNavigate()

  useEffect(() => {
    
    if (userdetails && userdetails.length > 0 && userdetails[0].email) {
      // user is logged in
    } else {
      navigate("/")
    }
  }, [])

  return (
    <div id='nav1'>
      
      <NavLink to="/dashboard" style={({isActive})=>{
        if(isActive){
          return {backgroundColor:"black"}
        }
      }}>Dashboard</NavLink>
      <Link to="/helpdesk">Helpdesk</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/edit">Editprofile</Link>
      <Link to="/signout" onClick={()=>{
          localStorage.clear();
          dispatch({ type: "clearData" });
}}>Signout</Link>
    </div>
  )
}

export default Navigation
