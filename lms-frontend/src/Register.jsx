import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {

    try {

      await axios.post(
        "https://online-learning-managment-system-1.onrender.com/auth/register",
        {
          name:name,
          email:email,
          password:password
        }
      );

      alert("Registration successful");

      navigate("/");

    } catch(error){

      console.log(error);
      alert("Registration failed");

    }

  };

  return (

    <div style={{textAlign:"center",marginTop:"120px"}}>

      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e)=>setName(e.target.value)}
      /><br/><br/>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      /><br/><br/>

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      /><br/><br/>

      <button onClick={handleRegister}>
        Register
      </button>

    </div>

  );
}

export default Register;