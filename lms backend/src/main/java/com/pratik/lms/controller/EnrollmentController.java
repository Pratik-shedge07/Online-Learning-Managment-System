package com.pratik.lms.controller;
import java.util.List;
import com.pratik.lms.entity.Course;
import com.pratik.lms.entity.Enrollment;
import com.pratik.lms.entity.User;
import com.pratik.lms.repository.CourseRepository;
import com.pratik.lms.repository.EnrollmentRepository;
import com.pratik.lms.repository.UserRepository;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/enroll")
@CrossOrigin(origins = "http://localhost:5173")
public class EnrollmentController {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public EnrollmentController(
            EnrollmentRepository enrollmentRepository,
            UserRepository userRepository,
            CourseRepository courseRepository) {

        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    @PostMapping
    public Enrollment enroll(@RequestParam Long userId, @RequestParam Long courseId) {

        User user = userRepository.findById(userId).orElseThrow();
        Course course = courseRepository.findById(courseId).orElseThrow();

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollment.setEnrolledAt(LocalDateTime.now());

        return enrollmentRepository.save(enrollment);
    }
    @GetMapping("/user/{id}/courses")
    public List<Course> getCoursesByUser(@PathVariable Long id) {

        User user = userRepository.findById(id).orElseThrow();

        List<Enrollment> enrollments = enrollmentRepository.findByUser(user);

        return enrollments.stream()
                .map(Enrollment::getCourse)
                .toList();
    }
    @DeleteMapping
    public String unenroll(@RequestParam Long userId, @RequestParam Long courseId) {

        User user = userRepository.findById(userId).orElseThrow();
        Course course = courseRepository.findById(courseId).orElseThrow();

        enrollmentRepository.deleteByUserAndCourse(user, course);

        return "User unenrolled successfully";
    }
    @GetMapping("/course/{id}/students")
    public List<User> getStudentsByCourse(@PathVariable Long id) {

        Course course = courseRepository.findById(id).orElseThrow();

        List<Enrollment> enrollments = enrollmentRepository.findByCourse(course);

        return enrollments.stream()
                .map(Enrollment::getUser)
                .toList();
    }
}