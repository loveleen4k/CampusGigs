const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { APPLICATION_STATUSES } = require('../constants/applicationStatuses.js');

const statusHistorySchema = new Schema(
    {
        status: { type: String, required: true },
        updatedAt: { type: Date, default: Date.now },
    },
    { _id: false }
);

const jobApplicationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    jobListing: { type: Schema.Types.ObjectId, ref: 'JobListing', required: true },
    message: { type: String },
    status: {
        type: String,
        enum: [...APPLICATION_STATUSES, 'pending'],
        default: 'submitted',
    },
    statusUpdatedAt: { type: Date, default: Date.now },
    statusHistory: { type: [statusHistorySchema], default: [] },
    submittedAt: { type: Date, default: Date.now },
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
