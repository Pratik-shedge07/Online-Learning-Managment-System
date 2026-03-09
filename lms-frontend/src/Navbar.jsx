import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#1e293b",
    color: "white"
  };

  const menuStyle = {
    display: "flex",
    gap: "20px"
  };

  const buttonStyle = {
    background: "#2563eb",
    border: "none",
    color: "white",
    padding: "8px 14px",
    cursor: "pointer",
    borderRadius: "4px"
  };

  const handleLogout = () => {

    localStorage.removeItem("user");
    navigate("/");

  };

  return (

    <div style={navStyle}>

      <h3>LMS</h3>

      <div style={menuStyle}>

        <button style={buttonStyle} onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button style={buttonStyle} onClick={() => navigate("/courses")}>
          Courses
        </button>

        <button style={buttonStyle} onClick={() => navigate("/my-courses")}>
          My Courses
        </button>

        <button style={buttonStyle} onClick={handleLogout}>
          Logout
        </button>

      </div>

    </div>

  );

}

export default Navbar;