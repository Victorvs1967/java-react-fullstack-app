import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { INSTRUCTOR, retrieveCourse, updateCourse, createCourse } from '../service/CourceDataService';

const CourseComponent = ({ match, history }) => {
    const [ id, setId ] = useState(match.params.id);
    const [ description, setDescription ] = useState('');

    const submitHandle = values => {
        let username = INSTRUCTOR;
        let course = {
            id,
            description: values.description,
            targetDate: values.targetDate
        };
        if (id === -1) {
            createCourse(username, course)
            .then(() => history.push('/courses'));
        } else {
            updateCourse(username, id, course)
            .then(() => history.push('/courses'));
        }
        console.log(values);
    };

    useEffect(() => {
        setId(match.params.id);
        if (id === -1) return;
    }, []);
    useEffect(() => {
        retrieveCourse(INSTRUCTOR, id)
        .then(response => setDescription(response.data.description));
    });

    const validate = values => {
        let errors = {};
        if (!values.description) {
            errors.description = 'Enter a description';
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 characters in description';
        }
        return errors;
    };

    return (
        <div>
            <h2>Course</h2>
            <div className="container">
                <Formik initialValues={{ id, description: description || '' }}
                        onSubmit={submitHandle}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={validate}
                        enableReinitialize={true}>
                    {props => (
                        <Form>
                            <ErrorMessage name="description" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Id</label>
                                <Field className="form-control" type="text" name="id" disabled />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field className="form-control" type="text" name="description" />
                            </fieldset>
                            <button className="btn btn-success px-5" type="submit">Save</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CourseComponent;