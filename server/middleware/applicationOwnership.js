const JobModel = require('../models/jobModel.js');
const Applications = require('../models/ApplicationModel.js');

const sameId = (a, b) => String(a) === String(b);

const requireSelf = (req, res, next) => {
    if (!sameId(req.params.id, req.user.id)) {
        return res.status(403).json({ msg: 'You are not authorized to perform this action.' });
    }
    next();
};

const requireJobOwner = async (req, res, next) => {
    try {
        const job = await JobModel.findById(req.params.id);
        if (!job) return res.status(400).json({ msg: 'Job does not exist.' });
        if (!sameId(job.createdBy, req.user.id)) {
            return res.status(403).json({ msg: 'You are not authorized to view these applications.' });
        }
        req.job = job;
        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

const requireValidJobListing = async (req, res, next) => {
    try {
        const job = await JobModel.findById(req.params.id);
        if (!job) return res.status(400).json({ msg: 'Job does not exist.' });
        req.job = job;
        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

const requireApplicationApplicant = async (req, res, next) => {
    try {
        const application = await Applications.findById(req.params.id);
        if (!application) return res.status(400).json({ msg: 'Application does not exist.' });
        if (!sameId(application.user, req.user.id)) {
            return res.status(403).json({ msg: 'You are not authorized to delete this application.' });
        }
        req.application = application;
        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

const requireApplicationJobOwner = async (req, res, next) => {
    try {
        const application = await Applications.findById(req.params.id);
        if (!application) return res.status(400).json({ msg: 'Application does not exist.' });
        const job = await JobModel.findById(application.jobListing);
        if (!job || !sameId(job.createdBy, req.user.id)) {
            return res.status(403).json({ msg: 'You are not authorized to update this application.' });
        }
        req.application = application;
        req.job = job;
        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = {
    requireSelf,
    requireJobOwner,
    requireValidJobListing,
    requireApplicationApplicant,
    requireApplicationJobOwner,
};
