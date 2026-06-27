import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';


function UserJobList({ onJobsChanged }) {
    const { userApi } = useContext(GlobalState);
    const user = userApi.user[0]; 
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const fetchUserJobs = async () => {
        try {
            const authToken = localStorage.getItem('accessToken');
            if (!authToken) throw new Error("User not authenticated");

            const res = await axios.get(`http://localhost:5000/jobs/userJobs/${user._id}`, {
                headers: { Authorization: authToken },
            });
            setJobs(res.data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to fetch user jobs');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user._id) fetchUserJobs();
    }, [user._id]);

    const handleDelete = async (jobId) => {
        if (!window.confirm('Delete this job listing?')) return;

        setDeletingId(jobId);
        try {
            const authToken = localStorage.getItem('accessToken');
            await axios.delete(`http://localhost:5000/jobs/delete/${jobId}`, {
                headers: { Authorization: authToken },
            });
            setJobs((prev) => prev.filter((job) => job._id !== jobId));
            if (onJobsChanged) onJobsChanged();
        } catch (err) {
            alert(err.response?.data?.msg || 'Failed to delete job listing');
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return <p className="empty-text">Loading...</p>;
    if (error) return <p className="notice notice-error">{error}</p>;
    if (!jobs.length) return <p className="empty-text">No job listings yet.</p>;

    return (
        <>
            {jobs.map((job) => (
                <div key={job._id} className="list-item-minimal">
                    <div>
                        <p style={{ color: 'white', marginBottom: '0.25rem' }}>{job.title}</p>
                        <p>{job.category} · {job.location}</p>
                    </div>
                    <div className="d-flex gap-2 flex-wrap">
                        <Link to={`/jobApplications/${job._id}`} className="btn-minimal">
                            Applications
                        </Link>
                        <button
                            type="button"
                            className="btn-minimal btn-minimal-danger"
                            onClick={() => handleDelete(job._id)}
                            disabled={deletingId === job._id}
                        >
                            {deletingId === job._id ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default UserJobList;
