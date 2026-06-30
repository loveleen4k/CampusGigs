export const APPLICATION_STATUSES = ['submitted', 'under_review', 'interview', 'accepted', 'rejected'];

export const STATUS_LABELS = {
    submitted: 'Submitted',
    under_review: 'Under review',
    interview: 'Interview',
    accepted: 'Accepted',
    rejected: 'Rejected',
};

export const STATUS_DESCRIPTIONS = {
    submitted: 'Your application was received and is waiting for the employer to review.',
    under_review: 'The employer is reviewing your application.',
    interview: 'You have been shortlisted for an interview.',
    accepted: 'Congratulations — you were selected for this role.',
    rejected: 'This application was not selected. Keep applying to other roles.',
};

export const TERMINAL_STATUSES = ['accepted', 'rejected'];

export const ACTIVE_STATUSES = ['submitted', 'under_review', 'interview'];

export const STATUS_FILTER_OPTIONS = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'In progress' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' },
];

export const normalizeStatus = (status) => (status === 'pending' ? 'submitted' : status);

export const getStatusLabel = (status) =>
    STATUS_LABELS[normalizeStatus(status)] || 'Submitted';

export const getStatusDescription = (status) =>
    STATUS_DESCRIPTIONS[normalizeStatus(status)] || STATUS_DESCRIPTIONS.submitted;

export const getStatusBadgeClass = (status) =>
    `status-badge status-${normalizeStatus(status) || 'submitted'}`;

export const matchesStatusFilter = (application, filter) => {
    const status = normalizeStatus(application.status);
    if (filter === 'all') return true;
    if (filter === 'active') return ACTIVE_STATUSES.includes(status);
    return status === filter;
};

export const formatStatusDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};
