import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import MyCourses from "./MyCourses";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/my-courses" element={<MyCourses />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;