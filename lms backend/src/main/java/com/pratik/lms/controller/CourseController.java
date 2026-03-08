package com.pratik.lms.controller;

import com.pratik.lms.entity.Course;
import com.pratik.lms.repository.CourseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    private final CourseRepository courseRepository;

    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    // Create course
    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseRepository.save(course);
    }

    // Get all courses
    @GetMapping
    public List<Course> getCourses() {
        return courseRepository.findAll();
    }
}