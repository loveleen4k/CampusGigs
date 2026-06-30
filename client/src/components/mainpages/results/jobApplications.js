import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
    APPLICATION_STATUSES,
    getStatusLabel,
    getStatusBadgeClass,
    formatStatusDate,
    normalizeStatus,
} from '../../../constants/applicationStatuses';

function JobApplicationsList() {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const authToken = localStorage.getItem('accessToken');
                const res = await axios.get(`http://localhost:5000/applications/jobApplications/${jobId}`, {
                    headers: { Authorization: authToken },
                });
                setApplications(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.msg || 'Failed to fetch applications');
                setLoading(false);
            }
        };

        fetchApplications();
    }, [jobId]);

    const handleUpdateStatus = async (appId, status) => {
        setUpdatingId(appId);
        try {
            const authToken = localStorage.getItem('accessToken');
            const res = await axios.put(
                `http://localhost:5000/applications/update/${appId}`,
                { status },
                { headers: { Authorization: authToken } }
            );
            setApplications((prev) =>
                prev.map((app) => (app._id === appId ? res.data.application : app))
            );
        } catch (err) {
            alert(err.response?.data?.msg || 'Failed to update application status');
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) return <p className="empty-text">Loading applications...</p>;
    if (error) return <p className="notice notice-error">{error}</p>;

    return (
        <div className="application-review-page">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                <h2 className="heading mb-0" style={{ fontSize: '120%' }}>Review applications</h2>
                <Link to="/profile" className="btn-minimal">Back to profile</Link>
            </div>

            <p className="empty-text mb-3">
                Update each applicant&apos;s status as you move through your hiring pipeline. Students see these updates on their profile in real time.
            </p>

            {!applications.length ? (
                <p className="empty-text">No applications for this job yet.</p>
            ) : (
                applications.map((app) => {
                    const applicant = app.user;
                    const status = normalizeStatus(app.status);
                    const lastUpdated = formatStatusDate(app.statusUpdatedAt || app.submittedAt);
                    const submittedOn = formatStatusDate(app.submittedAt);

                    return (
                        <div key={app._id} className="list-item-minimal application-review-item">
                            <div className="application-status-main">
                                <div className="application-status-header">
                                    <p className="application-title">
                                        {applicant?.name || 'Applicant'}
                                    </p>
                                    <span className={getStatusBadgeClass(status)}>
                                        {getStatusLabel(status)}
                                    </span>
                                </div>
                                {applicant?.email && (
                                    <p className="application-meta">{applicant.email}</p>
                                )}
                                {app.message && (
                                    <p className="application-status-note">&ldquo;{app.message}&rdquo;</p>
                                )}
                                {applicant?.skills?.length > 0 && (
                                    <p className="application-meta">
                                        Skills · {applicant.skills.join(', ')}
                                    </p>
                                )}
                                <p className="application-updated">
                                    Applied · {submittedOn}
                                    {lastUpdated && lastUpdated !== submittedOn && (
                                        <> · Status updated · {lastUpdated}</>
                                    )}
                                </p>
                            </div>
                            <div className="application-review-actions">
                                <select
                                    className="status-select"
                                    value={status}
                                    disabled={updatingId === app._id}
                                    onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                                >
                                    {APPLICATION_STATUSES.map((option) => (
                                        <option key={option} value={option}>
                                            {getStatusLabel(option)}
                                        </option>
                                    ))}
                                </select>
                                {updatingId === app._id && (
                                    <span className="application-updated">Updating...</span>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default JobApplicationsList;
