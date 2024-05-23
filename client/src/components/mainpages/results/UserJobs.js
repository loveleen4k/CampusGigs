import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';


function UserJobList() {
    const { userApi } = useContext(GlobalState);
    const user = userApi.user[0]; 
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserJobs = async () => {
            try {
                const authToken = localStorage.getItem('accessToken');
                if (!authToken) {
                    throw new Error("User not authenticated");
                }
              

                const res = await axios.get(`http://localhost:5000/jobs/userJobs/${user._id}`, {
                    headers: {
                        Authorization: authToken,
                    },
                });
                setJobs(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.msg || 'Failed to fetch user jobs');
                setLoading(false);
            }
        };

        fetchUserJobs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container>
            <h2>My Job Listings</h2>
            <Row>
                {jobs.map((job) => (
                    <Col md={4} key={job._id} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{job.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{job.category}</Card.Subtitle>
                                <Card.Text>{job.description}</Card.Text>
                                <Card.Text>
                                    <small className="text-muted">{job.location}</small>
                                </Card.Text>
                                
                                <Button variant="dark" as={Link} to={`/jobApplication/${job._id}`}>View Applications</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default UserJobList;
