
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function Editprofile() {
  const firstNameref = useRef();
  const lastNameref = useRef();
  const emailref = useRef();
  const passwordref = useRef();
  const mobileNumberref = useRef();

  const userobj = useSelector((store) => {
    return store.details
  });
  console.log(userobj);

useEffect(()=>{
  firstNameref.current.value=userobj[0].firstName;
  lastNameref.current.value=userobj[0].lastName;
  emailref.current.value=userobj[0].email;
  passwordref.current.value=userobj[0].password;
  mobileNumberref.current.value=userobj[0].mobileNumber;
},[])


  const myfunction = async () => {
    const mybody =new FormData()
    mybody.append("firstName", firstNameref.current.value) 
    mybody.append("lastName", lastNameref.current.value) 
    mybody.append("email",emailref.current.value)
    mybody.append("password",passwordref.current.value)
    mybody.append("mobileNumber",mobileNumberref.current.value)
   

    const requestmethod = {
      method: "PATCH",
      body: mybody
    };

    try {
      const res = await fetch("http://localhost:2222/mydetailsupdate", requestmethod);
      const resdata = await res.json();
      console.log("Successful data post:", resdata);
      alert("updataed successful!");
     
    } catch (err) {
      console.log(" Something went wrong:", err);
      alert("update failed!");
    }
    <Link to="/"></Link>
  };

  return (
    <div className="App">
      <form>
        <h1>Editprofile</h1>
        <div>
          <label>First Name:</label>
          <input ref={firstNameref} type='text' />
        </div>
        <div>
          <label>Last Name:</label>
          <input ref={lastNameref} type='text' />
        </div>
        <div>
          <label>Email:</label>
          <input ref={emailref} type='email' readOnly />
        </div>
        <div>
          <label>Password:</label>
          <input ref={passwordref} type='password' />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input ref={mobileNumberref} type='tel' />
        </div>
        <Link to="/">
        <button type='button' onClick={myfunction}></button>
        </Link>
        
      </form>
    </div>
  );
}

export default Editprofile
