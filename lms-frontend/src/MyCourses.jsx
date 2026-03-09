import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

function MyCourses() {

  const [courses, setCourses] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    if (!user) return;

    axios
      .get(`http://localhost:8080/enroll/user/${user.id}/courses`)
      .then((response) => {

        console.log("My courses:", response.data);
        setCourses(response.data);

      })
      .catch((error) => {

        console.error(error);

      });

  }, []);

  const unenrollCourse = async (courseId) => {

    try {

      await axios.delete(
        `http://localhost:8080/enroll?userId=${user.id}&courseId=${courseId}`
      );

      alert("Unenrolled successfully");

      // update UI without refreshing
      setCourses(courses.filter(course => course.id !== courseId));

    } catch (error) {

      console.error(error);
      alert("Unenroll failed");

    }

  };

  const courseBox = {
    background: "#f4f4f4",
    padding: "20px",
    margin: "10px auto",
    width: "320px",
    borderRadius: "8px",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.1)"
  };

  const buttonStyle = {
    marginTop: "10px",
    padding: "8px 16px",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px"
  };

  return (

    <>
      <Navbar />

      <div style={{ textAlign: "center", marginTop: "80px" }}>

        <h2>My Courses</h2>

        {courses.length === 0 && (
          <p>No enrolled courses yet</p>
        )}

        {courses.map((course, index) => (

          <div key={course.id + "-" + index} style={courseBox}>

            <h3>{course.title}</h3>

            <p>{course.description}</p>

            <p><b>Instructor:</b> {course.instructor}</p>

            <button
              style={buttonStyle}
              onClick={() => unenrollCourse(course.id)}
            >
              Unenroll
            </button>

          </div>

        ))}

      </div>
    </>

  );

}

export default MyCourses;