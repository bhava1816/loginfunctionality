import React from 'react'
import { useSelector } from 'react-redux'
import Navigation from './Navigation'

function Dashboard() {
  const userobj = useSelector((store) => store.details);
  console.log(userobj)
  if (!userobj || userobj.length === 0) {
    return (
      <div>
        <Navigation />
        <h2>No user data found. Please login first.</h2>
      </div>
    );
  }

  return (
    <div className='nav'>
      <Navigation />
      {userobj.map((ele, i) => (
        <div key={i} id='order'>
          <h1>{ele.firstName}</h1>
          <h1>{ele.lastName}</h1>
          <h1>{ele.email}</h1>
          <h1>{ele.mobileNumber}</h1>
        </div>
      ))}
    </div>
  );
}


export default Dashboard;
