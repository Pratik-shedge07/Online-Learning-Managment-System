import axios from "axios";
import { useEffect, useState } from "react";

function Courses() {

  const [courses, setCourses] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    axios.get("http://localhost:8080/courses")
      .then((response) => {

        console.log(response.data);
        setCourses(response.data);

      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  const enrollCourse = async (courseId) => {

    try {

      await axios.post(
        `http://localhost:8080/enroll?userId=${user.id}&courseId=${courseId}`
      );

      alert("Enrollment successful!");

    } catch (error) {

      console.error(error);
      alert("Enrollment failed");

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
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px"
  };

  return (

    <div style={{ textAlign: "center", marginTop: "80px" }}>

      <h2>Available Courses</h2>

      {courses.map((course) => (

        <div key={course.id} style={courseBox}>

          <h3>{course.title}</h3>

          <p>{course.description}</p>

          <p><b>Instructor:</b> {course.instructor}</p>

          <button
            style={buttonStyle}
            onClick={() => enrollCourse(course.id)}
          >
            Enroll
          </button>

        </div>

      ))}

    </div>

  );

}

export default Courses;