import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function App() {
  const firstNameref = useRef();
  const lastNameref = useRef();
  const emailref = useRef();
  const passwordref = useRef();
  const mobileNumberref = useRef();
  let dispath=useDispatch()
  const myfunction = async () => {
    const mybody = {
      firstName: firstNameref.current.value,
      lastName: lastNameref.current.value,
      email: emailref.current.value,
      password: passwordref.current.value,
      mobileNumber: mobileNumberref.current.value
    };

    const requestmethod = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mybody)
    };

    try {
      const res = await fetch("http://localhost:2222/mydetails", requestmethod);
      const resdata = await res.json();
      console.log("Successful data post:", resdata);
      alert("Signup successful!");
      dispath({type:"datasending",data:resdata})
    } catch (err) {
      console.log(" Something went wrong:", err);
      alert("Signup failed!");
    }
    <Link to="/"></Link>
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
