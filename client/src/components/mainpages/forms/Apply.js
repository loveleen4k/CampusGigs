import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Form, Button, Container } from 'react-bootstrap';

const JobApplicationFormContainer = styled(Container)`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
`;

function JobApplicationForm() {
    const { jobId } = useParams();
    const [message, setMessage] = useState('');
    
    if(!jobId){
        return (
            <>Wrong application</>
        )
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authToken = localStorage.getItem('accessToken');
            const newApplication = {
                message
            };
    
            const response = await axios.post(`http://localhost:5000/applications/newApplication/${jobId}`, newApplication, {
                headers: {
                    Authorization: authToken,
                },
            });
    
            if (response.status === 201) {
                alert('Application submitted successfully!');
                setMessage('');
                window.location.href = '/Profile';
            } else {
                console.log(response.status, " ", response.data);
                alert('Failed to submit application. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Failed to submit application. Please try again.');
        }
    };
    

    return (
        <JobApplicationFormContainer>
            <h2>Apply for Job</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter your application message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Submit Application
                </Button>
            </Form>
        </JobApplicationFormContainer>
    );
}

export default JobApplicationForm;
