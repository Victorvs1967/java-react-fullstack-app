import React, { useState, useEffect } from 'react';
import { retrieveAllCourses, deleteCourse, INSTRUCTOR } from '../service/CourceDataService';

const ListCoursesComponent = ({ history }) => {

    const [ courses, setCourses ] = useState([]);
    const [ message, setMessage ] = useState(null);

    const refreshCourses = () => {
        retrieveAllCourses(INSTRUCTOR)
        .then(response => setCourses(response.data));
    }
    const deleteCourseClick = id => {
        deleteCourse(INSTRUCTOR, id)
        .then(response => {
            setMessage(`Delete of course ${id} successful`);
            refreshCourses();
        });
    };
    const updateCourseClicked = id => history.push(`/courses/${id}`);
    const addCourseClicked = () => history.push(`/courses/-1`);

    useEffect(() => refreshCourses(), []);

    return (
        <div className="container">
            <h3>All Courses</h3>
            {message && <div className="alert alert-success">{ message }</div>}
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Description</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => 
                                <tr key={course.id}>
                                    <td>{course.id}</td>
                                    <td>{course.description}</td>
                                    <td><button className="btn btn-warning" onClick={() => deleteCourseClick(course.id)}>Delete</button></td>
                                    <td><button className="btn btn-success" onClick={() => updateCourseClicked(course.id)}>Update</button></td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
            <div className="row">
                <button className="btn btn-success px-5" onClick={ addCourseClicked }>Add</button>
            </div>
        </div>
    );
};

export default ListCoursesComponent;