const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobListingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    requirements: { type: String },
    personalInfo: { type: String},
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'UserProfile' ,required:true},
    applications:[{type: Schema.Types.ObjectId,ref :'JobApplication'}]
});

const JobModel = mongoose.model('JobListing', jobListingSchema);

module.exports = JobModel;
