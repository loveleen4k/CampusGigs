
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const JobFormContainer = styled(Container)`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
`;

function JobForm() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [requirements, setRequirements] = useState('');
    const [personalInfo, setPersonalInfo] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authToken = localStorage.getItem('accessToken');
            const newJob = {
                title, 
                description,
                location,
                requirements,
                personalInfo,
            };
    
            const response = await axios.post('http://localhost:5000/jobs/create', newJob, {
                headers: {
                    Authorization: authToken,
                },
            });
    
            if (response.status === 201) {
                alert('Job created successfully!');
                window.location.href='/Profile';
            } else {
                alert('Failed to create job. Please try again.');
            }
        } catch (error) {
            console.error('Error creating job:', error);
            alert('Failed to create job. Please try again.');
        }
    };
    

    return (
        <JobFormContainer>
            <h2 id="headings">Create Job</h2>
            <Form variant="dark" onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter job title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Tutor">Tutor</option>
                        <option value="Programming">Programming</option>
                        <option value="Internship">Internship</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter job description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter job location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formRequirements">
                    <Form.Label>Requirements</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter job requirements"
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formPersonalInfo">
                    <Form.Label>Personal Info</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter contact info or personal info"
                        value={personalInfo}
                        onChange={(e) => setPersonalInfo(e.target.value)}
                    />
                </Form.Group>

                <Button variant="dark" type="submit">
                    Create Job
                </Button>
            </Form>
        </JobFormContainer>
    );
}

export default JobForm;
