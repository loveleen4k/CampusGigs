import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';

const ApplicationsContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
`;

function ApplicationsList() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userApi } = useContext(GlobalState);
    const user = userApi.user[0];

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const authToken = localStorage.getItem('accessToken');
                if (!authToken) {
                    setError('No auth token found');
                    setLoading(false);
                    return;
                }

                const res = await axios.get(`http://localhost:5000/applications/get/${user._id}`, {
                    headers: {
                        Authorization: authToken,
                    },
                });

                setApplications(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.msg || 'Failed to fetch applications');
                setLoading(false);
            }
        };

        fetchApplications();
    }, [user._id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <ApplicationsContainer >
            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                applications.map(application => (
                    <div key={application._id}>
                        <p>Application ID: {application._id}</p>
                        {/* <Link to={`/application/${application._id}`}>check details...</Link> */}
                        <p>Application Status: {application.status}</p>
                    </div>
                ))
            )}
        </ApplicationsContainer>
    );
}

export default ApplicationsList;
