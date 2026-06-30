import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import {
    STATUS_FILTER_OPTIONS,
    getStatusLabel,
    getStatusDescription,
    getStatusBadgeClass,
    matchesStatusFilter,
    formatStatusDate,
    normalizeStatus,
} from '../../../constants/applicationStatuses';

function ApplicationsList({ onApplicationsChanged }) {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');
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

    const filteredApplications = applications.filter((app) =>
        matchesStatusFilter(app, statusFilter)
    );

    const statusCounts = applications.reduce((counts, app) => {
        const status = normalizeStatus(app.status);
        counts[status] = (counts[status] || 0) + 1;
        return counts;
    }, {});

    if (loading) return <p className="empty-text">Loading application statuses...</p>;
    if (error) return <p className="notice notice-error">{error}</p>;

    if (!applications.length) {
        return (
            <div className="status-tracking-empty">
                <p className="empty-text">No applications yet.</p>
                <p className="empty-text">
                    Apply for a job and track every status update here — from submission through review, interview, and final decision.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="status-summary">
                {Object.entries(statusCounts).map(([status, count]) => (
                    <span key={status} className={getStatusBadgeClass(status)}>
                        {getStatusLabel(status)} · {count}
                    </span>
                ))}
            </div>

            <div className="status-filter-bar">
                {STATUS_FILTER_OPTIONS.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        className={`status-filter-btn${statusFilter === option.value ? ' active' : ''}`}
                        onClick={() => setStatusFilter(option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {!filteredApplications.length && (
                <p className="empty-text">No applications match this filter.</p>
            )}

            {filteredApplications.map((application) => {
                const job = application.jobListing;
                const jobTitle = job?.title || 'Job no longer available';
                const jobMeta = job ? `${job.category} · ${job.location}` : null;
                const status = normalizeStatus(application.status);
                const lastUpdated = formatStatusDate(application.statusUpdatedAt || application.submittedAt);

                return (
                    <div key={application._id} className="list-item-minimal application-status-item">
                        <div className="application-status-main">
                            <div className="application-status-header">
                                <p className="application-title">{jobTitle}</p>
                                <span className={getStatusBadgeClass(status)}>
                                    {getStatusLabel(status)}
                                </span>
                            </div>
                            {jobMeta && <p className="application-meta">{jobMeta}</p>}
                            <p className="application-status-note">{getStatusDescription(status)}</p>
                            {lastUpdated && (
                                <p className="application-updated">Last updated · {lastUpdated}</p>
                            )}
                        </div>
                        <button
                            type="button"
                            className="btn-minimal btn-minimal-danger"
                            onClick={() => handleDelete(application._id)}
                            disabled={deletingId === application._id}
                        >
                            {deletingId === application._id ? 'Deleting...' : 'Withdraw'}
                        </button>
                    </div>
                );
            })}
        </>
    );
}

export default ApplicationsList;
