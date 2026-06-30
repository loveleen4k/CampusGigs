const APPLICATION_STATUSES = ['submitted', 'under_review', 'interview', 'accepted', 'rejected'];

const LEGACY_STATUS_ALIASES = { pending: 'submitted' };

const STATUS_LABELS = {
    submitted: 'Submitted',
    under_review: 'Under review',
    interview: 'Interview',
    accepted: 'Accepted',
    rejected: 'Rejected',
};

const TERMINAL_STATUSES = ['accepted', 'rejected'];

const ACTIVE_STATUSES = ['submitted', 'under_review', 'interview'];

const normalizeStatus = (status) => LEGACY_STATUS_ALIASES[status] || status;

const isValidStatus = (status) =>
    APPLICATION_STATUSES.includes(normalizeStatus(status));

module.exports = {
    APPLICATION_STATUSES,
    STATUS_LABELS,
    TERMINAL_STATUSES,
    ACTIVE_STATUSES,
    normalizeStatus,
    isValidStatus,
};
