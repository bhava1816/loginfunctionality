import { useRef } from 'react';

import { Link } from 'react-router-dom';

function App() {
  const firstNameref = useRef();
  const lastNameref = useRef();
  const emailref = useRef();
  const passwordref = useRef();
  const mobileNumberref = useRef();
  
 
  const myfunction = async () => {

  let mybody=new FormData()
  mybody.append("firstName", firstNameref.current.value)
   mybody.append("lastName", lastNameref.current.value) 
   mybody.append("email", emailref.current.value)
   mybody.append("password", passwordref.current.value)    
  mybody.append("mobileNumber",mobileNumberref.current.value)
    

    const requestmethod = {
      method: "POST",
      body: mybody
    };

    try {
      const res = await fetch("http://localhost:2222/mydetails", requestmethod);
      const resdata = await res.json();
      
      console.log("signup data", resdata);
      if(resdata.status==="success"){
         alert("Signup successful!");
         console.log(resdata.data)
      
      }
     
    } catch (err) {
      console.log(" Something went wrong:", err);
      alert("Signup failed!");
    }
    
    
  };

  return (
    <div className="App">
      <form>
        <h1>Signup</h1>
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
          <input ref={emailref} type='email' />
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

export default App;
