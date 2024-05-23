const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    jobListing: { type: Schema.Types.ObjectId, ref: 'JobListing', required: true },
    message: { type: String },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    submittedAt: { type: Date, default: Date.now }
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
