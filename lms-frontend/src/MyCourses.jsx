import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { FaUserTie, FaTrash } from "react-icons/fa";

function MyCourses() {

  const [courses, setCourses] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    if (!user) return;

    axios
    axios.get(`https://online-learning-managment-system-1.onrender.com/enroll/user/${user.id}/courses`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  const unenrollCourse = async (courseId) => {

    try {

      await axios.delete(
        `https://online-learning-managment-system-1.onrender.com/enroll?userId=${user.id}&courseId=${courseId}`
      );

      alert("Unenrolled successfully");

      setCourses(courses.filter(course => course.id !== courseId));

    } catch (error) {

      console.error(error);
      alert("Unenroll failed");

    }

  };

  const pageStyle = {
    textAlign: "center",
    marginTop: "80px",
    padding: "30px"
  };

  const gridStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
    marginTop: "40px"
  };

  const cardStyle = {
    background: "linear-gradient(145deg,#0f172a,#020617)",
    padding: "20px",
    borderRadius: "16px",
    width: "350px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.5)",
    transition: "all 0.35s ease",
    border: "1px solid rgba(255,255,255,0.06)"
  };

  const videoStyle = {
    width: "100%",
    height: "200px",
    borderRadius: "10px",
    marginTop: "14px",
    border: "none"
  };

  const instructorStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "10px",
    opacity: "0.8",
    fontSize: "14px"
  };

  const buttonStyle = {
    marginTop: "16px",
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.25s ease",
    width: "100%",
    fontWeight: "500"
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

        <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>
          My Courses
        </h2>

        {courses.length === 0 && (
          <div style={{ opacity: "0.7", marginTop: "40px" }}>
            <h3>No courses enrolled</h3>
            <p>Start learning by enrolling in a course</p>
          </div>
        )}

        <div style={gridStyle}>

          {courses.map((course, index) => (

            <div
              key={course.id + "-" + index}
              style={cardStyle}
              onMouseEnter={(e) => hoverCard(e, 1.04)}
              onMouseLeave={(e) => hoverCard(e, 1)}
            >

              <h3>{course.title}</h3>

              <p style={{ opacity: "0.85", fontSize: "14px" }}>
                {course.description}
              </p>

              <div style={instructorStyle}>
                <FaUserTie />
                <span>{course.instructor}</span>
              </div>

              {course.videoUrl && (
                <iframe
                  src={course.videoUrl}
                  title="Course Video"
                  allowFullScreen
                  style={videoStyle}
                ></iframe>
              )}

              <button
                style={buttonStyle}
                onMouseEnter={(e) => hoverBtn(e, 1.08)}
                onMouseLeave={(e) => hoverBtn(e, 1)}
                onClick={() => unenrollCourse(course.id)}
              >
                <FaTrash />
                Unenroll
              </button>

            </div>

          ))}

        </div>

      </div>

    </>
  );

}

export default MyCourses;