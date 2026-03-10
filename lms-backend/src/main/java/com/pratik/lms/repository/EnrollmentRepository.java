package com.pratik.lms.repository;

import com.pratik.lms.entity.Enrollment;
import com.pratik.lms.entity.User;
import com.pratik.lms.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    List<Enrollment> findByUser(User user);

    List<Enrollment> findByCourse(Course course);

    @Transactional
    void deleteByUserAndCourse(User user, Course course);

}