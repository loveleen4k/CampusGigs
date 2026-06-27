import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { GlobalState } from '../../../GlobalState';

function ApplicationsList({ onApplicationsChanged }) {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const { userApi } = useContext(GlobalState);
    const user = userApi.user[0];

    const fetchApplications = async () => {
        try {
            const authToken = localStorage.getItem('accessToken');
            if (!authToken) {
                setError('No auth token found');
                setLoading(false);
                return;
            }

            const res = await axios.get(`http://localhost:5000/applications/get/${user._id}`, {
                headers: { Authorization: authToken },
            });

            setApplications(res.data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to fetch applications');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user._id) {
            fetchApplications();
        }
    }, [user._id]);

    const handleDelete = async (applicationId) => {
        if (!window.confirm('Delete this application?')) return;

        setDeletingId(applicationId);
        try {
            const authToken = localStorage.getItem('accessToken');
            await axios.delete(`http://localhost:5000/applications/delete/${applicationId}`, {
                headers: { Authorization: authToken },
            });
            setApplications((prev) => prev.filter((app) => app._id !== applicationId));
            if (onApplicationsChanged) onApplicationsChanged();
        } catch (err) {
            alert(err.response?.data?.msg || 'Failed to delete application');
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return <p className="empty-text">Loading...</p>;
    if (error) return <p className="notice notice-error">{error}</p>;

    if (!applications.length) {
        return <p className="empty-text">No applications yet.</p>;
    }

    return (
        <>
            {applications.map((application) => (
                <div key={application._id} className="list-item-minimal">
                    <p>Status · {application.status || 'pending'}</p>
                    <button
                        type="button"
                        className="btn-minimal btn-minimal-danger"
                        onClick={() => handleDelete(application._id)}
                        disabled={deletingId === application._id}
                    >
                        {deletingId === application._id ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            ))}
        </>
    );
}

export default ApplicationsList;
