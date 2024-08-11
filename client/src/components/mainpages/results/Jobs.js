import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';


function JobList() {
    const { category } = useParams();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(category || '');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get('http://localhost:5000/jobs/get', {
                    params: { category: selectedCategory },
                });
                setJobs(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.msg || 'Failed to fetch jobs');
                setLoading(false);
            }
        };

        fetchJobs();
    }, [selectedCategory]);

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);
       // navigate(`/jobs/${newCategory}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container >
            <h2>Available Jobs</h2>
            <Form>
                <Form.Group controlId="categorySelect">
                    <Form.Label>Filter by Category</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="">All Categories</option>
                        <option value="Tutor">Tutor</option>
                        <option value="Programming">Programming</option>
                        <option value="Internship">Internship</option>
                        
                    </Form.Control>
                </Form.Group>
            </Form>
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
                                <Button variant="dark" as={Link} to={`/apply/${job._id}`}>Apply Now</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default JobList;
