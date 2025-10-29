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
const Login = async () => {
    const formData = new FormData();
    formData.append("token", localStorage.getItem("token"));
   

    try {
      const response = await fetch("http://localhost:2222/loginvalidate", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      dispatch({type:"datasending",data:result.data})
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
  const handleLogin = async () => {
    const formData = new FormData();
    formData.append("email", emailRef.current.value.trim());
    formData.append("password", passwordRef.current.value.trim());

    try {
      const response = await fetch("http://localhost:2222/login", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      dispatch({type:"datasending",data:result.data})
      console.log(result);
     

      if (result.status === "success") {
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
