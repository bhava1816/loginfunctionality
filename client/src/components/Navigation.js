import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Navigation() {
  const userdetails = useSelector((store) => store.details)
  const navigate = useNavigate()

  useEffect(() => {
    // ✅ check array and first element
    if (userdetails && userdetails.length > 0 && userdetails[0].email) {
      // user is logged in
    } else {
      navigate("/")
    }
  }, [userdetails, navigate])

  return (
    <div id='nav1'>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/helpdesk">Helpdesk</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/signout">Signout</Link>
    </div>
  )
}

export default Navigation
