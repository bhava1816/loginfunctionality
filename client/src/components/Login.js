import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  let dispatch=useDispatch()
useEffect(()=>{
    if(localStorage.getItem("token")){
      
    Login()
    }
})
const Login = async () => {//its is used for auto login functinality
    const formData = new FormData();
    formData.append("token", localStorage.getItem("token"));
   

    try {
      const response = await fetch("/loginvalidate", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      dispatch({type:"datasending",data:result.data})
      emailRef.current.value=result.data.email
      passwordRef.current.value=result.data.password
      console.log(result);
     

      if (result.status === "success") {
        alert("Login successful");
        navigate("/dashboard");
        
      } else {
        alert(result.msg || "Invalid credentials");
      }
    } catch (err) {
      console.error("Error during login:", err);
      
    }
  };
  const handleLogin = async () => {//we are creating an login credital are correct than we are creating an jwt web token
    const formData = new FormData();
    formData.append("email", emailRef.current.value.trim());
    formData.append("password", passwordRef.current.value.trim());

    try {
      const response = await fetch("/login", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      
      console.log(result);
     

      if (result.status === "success") {
        dispatch({type:"datasending",data:result.data})
        alert("Login successful");
        navigate("/dashboard");
        localStorage.setItem("token",result.data.token)
      } else {
        alert(result.msg || "Invalid credentials");
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("Server error — check console");
    }
  };

  return (
    <div style={{ margin: "40px" }}>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Autologin Functionality</h1>
        <div>
          <label>Email:</label>
          <input type="email" ref={emailRef} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" ref={passwordRef} required />
        </div>
        <br />
        <button type="button" onClick={handleLogin}>
          Submit
        </button>
        <br /><br />
        <NavLink
          to="/signup"
          style={({ isActive }) =>
            isActive ? { color: "blue", textDecoration: "none" } : undefined
            
          }
        >
          Signup
        </NavLink>
      </form>
    </div>
  );
}

export default Login;
