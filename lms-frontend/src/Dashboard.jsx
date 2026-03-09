import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

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

    // get total courses
    axios.get("http://localhost:8080/courses")
      .then(res => {
        setTotalCourses(res.data.length);
      });

    // get enrolled courses
    axios.get(`http://localhost:8080/enroll/user/${user.id}/courses`)
      .then(res => {
        setMyCourses(res.data.length);
      });

  }, []);

  const cardStyle = {
    background: "#f4f4f4",
    padding: "30px",
    borderRadius: "10px",
    width: "220px",
    textAlign: "center",
    boxShadow: "0px 3px 8px rgba(0,0,0,0.1)"
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginTop: "40px"
  };

  return (

    <>
      <Navbar />

      <div style={{ textAlign: "center", marginTop: "60px" }}>

        <h1>Dashboard</h1>

        <p>Welcome {user?.name}</p>

        <div style={containerStyle}>

          <div style={cardStyle}>
            <h3>Available Courses</h3>
            <h2>{totalCourses}</h2>
          </div>

          <div style={cardStyle}>
            <h3>My Courses</h3>
            <h2>{myCourses}</h2>
          </div>

        </div>

        <div style={{marginTop:"40px"}}>

          <button
            style={{margin:"10px", padding:"10px 18px"}}
            onClick={() => navigate("/courses")}
          >
            View Courses
          </button>

          <button
            style={{margin:"10px", padding:"10px 18px"}}
            onClick={() => navigate("/my-courses")}
          >
            My Courses
          </button>

        </div>

      </div>

    </>
  );

}

export default Dashboard;