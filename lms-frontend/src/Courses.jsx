import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { FaUserTie, FaPlayCircle } from "react-icons/fa";

function Courses() {

  const [courses, setCourses] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {

    axios.get("http://localhost:8080/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  const enrollCourse = async (courseId) => {

    if (!user?.id) {
      alert("Please login first");
      return;
    }

    try {

      await axios.post(
        `http://localhost:8080/enroll?userId=${user.id}&courseId=${courseId}`
      );

      alert("Enrollment successful!");
      window.location.reload();

    } catch (error) {

      console.error(error);
      alert("Enrollment failed");

    }

  };

  const pageStyle = {
    textAlign: "center",
    marginTop: "80px",
    padding: "20px"
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: "25px",
    maxWidth: "1200px",
    margin: "40px auto"
  };

  const cardStyle = {
    background: "var(--card)",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
    transition: "all 0.3s ease",
    textAlign: "left"
  };

  const videoStyle = {
    width: "100%",
    height: "180px",
    borderRadius: "10px",
    marginTop: "10px"
  };

  const instructorStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "8px",
    opacity: "0.8"
  };

  const buttonStyle = {
    marginTop: "12px",
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg,var(--primary),var(--accent))",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "6px",
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

        <h2>Explore Courses</h2>

        <div style={gridStyle}>

          {courses.map((course, index) => (

            <div
              key={course.id + "-" + index}
              style={cardStyle}
              onMouseEnter={(e)=>hoverCard(e,1.03)}
              onMouseLeave={(e)=>hoverCard(e,1)}
            >

              <h3>{course.title}</h3>

              <p style={{opacity:"0.85"}}>
                {course.description}
              </p>

              <div style={instructorStyle}>
                <FaUserTie/>
                <span>{course.instructor}</span>
              </div>

              {course.videoUrl && (
                <iframe
                  src={course.videoUrl}
                  title="Course Video"
                  frameBorder="0"
                  allowFullScreen
                  style={videoStyle}
                ></iframe>
              )}

              <button
                style={buttonStyle}
                onMouseEnter={(e)=>hoverBtn(e,1.08)}
                onMouseLeave={(e)=>hoverBtn(e,1)}
                onClick={() => enrollCourse(course.id)}
              >
                <FaPlayCircle/>
                Enroll
              </button>

            </div>

          ))}

        </div>

      </div>
    </>
  );

}

export default Courses;