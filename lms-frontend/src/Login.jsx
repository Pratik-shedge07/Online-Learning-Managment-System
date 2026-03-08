import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email: email,
          password: password
        }
      );

      if(response.data){

        // save logged user
        localStorage.setItem("user", JSON.stringify(response.data));

        alert("Login successful");

        navigate("/dashboard");

      } else {

        alert("Invalid email or password");

      }

    } catch(error){

      console.log(error);
      alert("Login failed");

    }

  };

  const container = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f6f9"
  };

  const box = {
    background: "white",
    padding: "40px",
    borderRadius: "8px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  };

  const input = {
    width: "100%",
    padding: "10px",
    marginTop: "10px"
  };

  const button = {
    width: "100%",
    padding: "10px",
    marginTop: "20px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer"
  };

  return (

    <div style={container}>

      <div style={box}>

        <h2>LMS Login</h2>

        <input
          style={input}
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          style={button}
          onClick={handleLogin}
        >
          Login
        </button>

      </div>

    </div>

  );

}

export default Login;