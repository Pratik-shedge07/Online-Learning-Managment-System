import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [flip, setFlip] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "https://online-learning-managment-system-1.onrender.com/auth/login",
        {
          email: loginEmail,
          password: loginPassword
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data));

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      if(error.response){
        alert(error.response.data);
      }else{
        alert("Server Error");
      }

    }

  };

  const handleRegister = async () => {

    try {

      await axios.post(
        "https://online-learning-managment-system-1.onrender.com/auth/register",
        {
          name: name,
          email: regEmail,
          password: regPassword
        }
      );

      alert("Registration Successful");

      setFlip(false);

    } catch (error) {

      if(error.response){
        alert(error.response.data);
      }else{
        alert("Server Error");
      }

    }

  };

  const container = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f1f5f9",
    perspective: "1000px"
  };

  const card = {
    width: "360px",
    height: "380px",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "0.6s",
    transform: flip ? "rotateY(180deg)" : "rotateY(0deg)"
  };

  const side = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    background: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center"
  };

  const back = {
    ...side,
    transform: "rotateY(180deg)"
  };

  const input = {
    width: "100%",
    padding: "10px",
    marginTop: "12px"
  };

  const button = {
    width: "100%",
    padding: "10px",
    marginTop: "20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer"
  };

  const link = {
    marginTop: "15px",
    color: "#2563eb",
    cursor: "pointer"
  };

  return (

    <div style={container}>

      <div style={card}>

        {/* LOGIN */}

        <div style={side}>

          <h2>LMS Login</h2>

          <input
            style={input}
            placeholder="Email"
            onChange={(e)=>setLoginEmail(e.target.value)}
          />

          <input
            style={input}
            type="password"
            placeholder="Password"
            onChange={(e)=>setLoginPassword(e.target.value)}
          />

          <button
            style={button}
            onClick={handleLogin}
          >
            Login
          </button>

          <p
            style={link}
            onClick={()=>setFlip(true)}
          >
            New user? Register
          </p>

        </div>

        {/* REGISTER */}

        <div style={back}>

          <h2>Create Account</h2>

          <input
            style={input}
            placeholder="Name"
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            style={input}
            placeholder="Email"
            onChange={(e)=>setRegEmail(e.target.value)}
          />

          <input
            style={input}
            type="password"
            placeholder="Password"
            onChange={(e)=>setRegPassword(e.target.value)}
          />

          <button
            style={button}
            onClick={handleRegister}
          >
            Register
          </button>

          <p
            style={link}
            onClick={()=>setFlip(false)}
          >
            Already have account? Login
          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;