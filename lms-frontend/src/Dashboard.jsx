import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { FaBookOpen, FaUserGraduate } from "react-icons/fa";

function Dashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [totalCourses, setTotalCourses] = useState(0);
  const [myCourses, setMyCourses] = useState(0);

  useEffect(() => {

    if (!user) {
      navigate("/");
      return;
    }

    axios.get("https://online-learning-managment-system-1.onrender.com/courses")
      .then(res => setTotalCourses(res.data.length));

    axios.get(`https://online-learning-managment-system-1.onrender.com/enroll/user/${user.id}/courses`)
      .then(res => setMyCourses(res.data.length));

  }, []);

  const pageStyle = {
    textAlign: "center",
    marginTop: "80px",
    padding: "20px"
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: "25px",
    maxWidth: "800px",
    margin: "40px auto"
  };

  const cardStyle = {
    background: "var(--card)",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
    cursor: "pointer"
  };

  const iconStyle = {
    fontSize: "28px",
    marginBottom: "10px",
    color: "var(--primary)"
  };

  const numberStyle = {
    fontSize: "32px",
    fontWeight: "600",
    background: "linear-gradient(90deg,var(--primary),var(--accent))",
    WebkitBackgroundClip: "text",
    color: "transparent"
  };

  const buttonContainer = {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap"
  };

  const buttonStyle = {
    padding: "12px 22px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    background: "linear-gradient(135deg,var(--primary),var(--accent))",
    color: "white",
    transition: "all 0.25s ease"
  };

  const hoverCard = (e, scale) => {
    e.currentTarget.style.transform = `scale(${scale})`;
  };

  const hoverBtn = (e, scale) => {
    e.currentTarget.style.transform = `scale(${scale})`;
  };

  return (

    <>
      <Navbar />

      <div style={pageStyle}>

        <h1 style={{marginBottom:"10px"}}>Dashboard</h1>

        <p style={{opacity:"0.8"}}>
          Welcome back, <b>{user?.name}</b>
        </p>

        {/* Stats Cards */}

        <div style={gridStyle}>

          <div
            style={cardStyle}
            onMouseEnter={(e)=>hoverCard(e,1.05)}
            onMouseLeave={(e)=>hoverCard(e,1)}
          >

            <FaBookOpen style={iconStyle} />

            <h3>Available Courses</h3>

            <div style={numberStyle}>
              {totalCourses}
            </div>

          </div>

          <div
            style={cardStyle}
            onMouseEnter={(e)=>hoverCard(e,1.05)}
            onMouseLeave={(e)=>hoverCard(e,1)}
          >

            <FaUserGraduate style={iconStyle} />

            <h3>My Courses</h3>

            <div style={numberStyle}>
              {myCourses}
            </div>

          </div>

        </div>

        {/* Navigation Buttons */}

        <div style={buttonContainer}>

          <button
            style={buttonStyle}
            onMouseEnter={(e)=>hoverBtn(e,1.07)}
            onMouseLeave={(e)=>hoverBtn(e,1)}
            onClick={() => navigate("/courses")}
          >
            Browse Courses
          </button>

          <button
            style={buttonStyle}
            onMouseEnter={(e)=>hoverBtn(e,1.07)}
            onMouseLeave={(e)=>hoverBtn(e,1)}
            onClick={() => navigate("/my-courses")}
          >
            My Learning
          </button>

        </div>

      </div>

    </>
  );
}

export default Dashboard;