import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function JobApplicationsList() {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/applications/jobApplications/${jobId}`);
                console.log(res.data);
                setApplications(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err.data);
                setError(err.response?.data?.msg || 'Failed to fetch applications');
                setLoading(false);
            }
        };
    
        fetchApplications();
    }, [jobId]);

    const handleUpdateStatus = async (appId, status) => {
        try {
            await axios.put(`http://localhost:5000/applications/update/${appId}`, { status });
            setApplications(applications.map(app => 
                app._id === appId ? { ...app, status } : app
            ));
        } catch (err) {
            alert(err.response?.data?.msg || 'Failed to update application status');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container>
            <h2>Applications for this Job</h2>
            <Row>
                {applications.map((app) => (
                    <Col md={4} key={app._id} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{app.jobListing}</Card.Title>
                                <Card.Text>User: {app.user}</Card.Text>
                                <Card.Text>
                                    <small className="text-muted">Message: {app.message}</small>
                                </Card.Text>
                                <Card.Text>
                                    <small className="text-muted">Status: {app.status}</small>
                                </Card.Text>
                                <Button variant="success" onClick={() => handleUpdateStatus(app._id, 'Accepted')}>Accept</Button>
                                <Button variant="danger" onClick={() => handleUpdateStatus(app._id, 'Rejected')} className="ml-2">Reject</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default JobApplicationsList;
