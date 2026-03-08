import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    if(!user){
      navigate("/");
    }

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/");

  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    marginTop: "20px",
    cursor: "pointer"
  };

  return (

    <div style={{textAlign:"center", marginTop:"80px"}}>

      <h1>Dashboard</h1>

      <p>Welcome {user?.name}</p>

      <button style={buttonStyle} onClick={handleLogout}>
        Logout
      </button>

    </div>

  );
}

export default Dashboard;