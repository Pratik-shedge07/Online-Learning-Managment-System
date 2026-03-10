import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBook, FaUserGraduate, FaSignOutAlt } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function Navbar() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") !== "light"
  );

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, []);

  useEffect(() => {

    if (darkMode) {
      document.body.classList.remove("light");
      localStorage.setItem("theme","dark");
    } else {
      document.body.classList.add("light");
      localStorage.setItem("theme","light");
    }

  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 40px",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: 1000
  };

  const logoStyle = {
    fontSize: "22px",
    fontWeight: "600",
    cursor: "pointer",
    background: "linear-gradient(90deg,#6366F1,#22D3EE)",
    WebkitBackgroundClip: "text",
    color: "transparent"
  };

  const menuStyle = {
    display: "flex",
    gap: "16px",
    alignItems: "center"
  };

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "linear-gradient(135deg,#6366F1,#22D3EE)",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontSize: "14px"
  };

  const logoutStyle = {
    ...buttonStyle,
    background: "#ef4444"
  };

  const themeButton = {
    background: "transparent",
    border: "1px solid #6366F1",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#6366F1",
    fontSize: "18px"
  };

  const hamburgerStyle = {
    fontSize: "28px",
    cursor: "pointer",
    color: "#22D3EE"
  };

  return (

    <div style={navStyle}>

      <div style={logoStyle} onClick={()=>navigate("/dashboard")}>
        CourseCraft
      </div>

      {!isMobile && (

        <div style={menuStyle}>

          <button style={buttonStyle} onClick={()=>navigate("/dashboard")}>
            <FaHome/> Dashboard
          </button>

          <button style={buttonStyle} onClick={()=>navigate("/courses")}>
            <FaBook/> Courses
          </button>

          <button style={buttonStyle} onClick={()=>navigate("/my-courses")}>
            <FaUserGraduate/> My Courses
          </button>

          <button style={themeButton} onClick={toggleTheme}>
            {darkMode ? <MdLightMode/> : <MdDarkMode/>}
          </button>

          <button style={logoutStyle} onClick={handleLogout}>
            <FaSignOutAlt/> Logout
          </button>

        </div>

      )}

      {isMobile && (
        <div style={hamburgerStyle} onClick={()=>setMenuOpen(!menuOpen)}>
          <HiMenuAlt3/>
        </div>
      )}

    </div>
  );
}

export default Navbar;