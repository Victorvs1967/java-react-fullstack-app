package com.vvs.springreactbackend.course;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.0.120:3000"})
public class CourseResource {
    
    @Autowired
    private CoursesHardcodedService courseManagmentService;

    @GetMapping("/instructors/{username}/courses")
    public List<Course> getAppCourses(@PathVariable String username) {
        return courseManagmentService.findAll();
    }
    @DeleteMapping("/instructors/{username}/courses/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable String username, @PathVariable long id) {
        Course course = courseManagmentService.deleteById(id);

        if (course != null) return ResponseEntity.noContent().build();
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/instructors/{username}/courses/{id}")
    public Course getCourse(@PathVariable String username, @PathVariable long id) {
        return courseManagmentService.findById(id);
    }
    @PutMapping("/instructors/{username}/courses/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable String username, @PathVariable long id, @RequestBody Course course) {
        Course courseUpdated = courseManagmentService.save(course);
        return new ResponseEntity<>(courseUpdated, HttpStatus.OK);
    }
    @PostMapping("/instructors/{username}/courses")
    public ResponseEntity<Void> createCourse(@PathVariable String username, @RequestBody Course course) {
        Course createdCourse = courseManagmentService.save(course);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdCourse.getId())
            .toUri();
        return ResponseEntity.created(uri).build();
    }
}
