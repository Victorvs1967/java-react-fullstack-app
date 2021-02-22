import axios from 'axios';

export const INSTRUCTOR = 'in28minutes';
export const COURSE_API_URL = 'http://192.168.0.120:8080';
export const INSTRUCTOR_API_URL = `${COURSE_API_URL}/instructors/${INSTRUCTOR}`;

export const retrieveAllCourses = name => axios.get(`${INSTRUCTOR_API_URL}/courses`);
export const retrieveCourse = (name, id) => axios.get(`${INSTRUCTOR_API_URL}/courses/${id}`);
export const deleteCourse = (name, id) => axios.delete(`${INSTRUCTOR_API_URL}/courses/${id}`);
export const updateCourse = (name, id, course) => axios.put(`${INSTRUCTOR_API_URL}/courses/${id}`, course);
export const createCourse = (name, course) => axios.post(`${INSTRUCTOR_API_URL}/courses/`, course);
