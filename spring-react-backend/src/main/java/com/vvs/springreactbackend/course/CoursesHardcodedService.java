package com.vvs.springreactbackend.course;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CoursesHardcodedService {
    
    private static List<Course> courses = new ArrayList<>();
    private static long idCounter = 0;

    static {
        courses.add(new Course(++idCounter, "in28minutes", "Learn Full stack with Spring Boot and ather."));
        courses.add(new Course(++idCounter, "in28minutes", "Learn Full stack with Spring Boot and React."));
        courses.add(new Course(++idCounter, "in28minutes", "Master Microservices with Spring Boot and Spring Cloud."));
        courses.add(new Course(++idCounter, "in28minutes", "Deploy Spring Boot Microservices to Cloud with Docker and Kubernetes."));
    }

    public List<Course> findAll() {
        return courses;
    }
    public Course findById(long id) {
        for (Course course: courses) {
            if (course.getId() == id) return course;
        }
        return null;
    }
    public Course deleteById(long id) {
        Course course = findById(id);

        if (course == null) return null;
        if (courses.remove(course)) return course;
        
        return null;
    }
    public Course save(Course course) {
        if (course.getId() == -1 || course.getId() == 0) {
            course.setId(++idCounter);
            courses.add(course);
        }
        return course;
    }
}
