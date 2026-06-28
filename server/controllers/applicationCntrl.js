const Applications = require('../models/ApplicationModel.js');

const VALID_STATUSES = ['pending', 'accepted', 'rejected'];

const applicationsCntrl = {
    createApplication: async (req, res) => {
        try {
            const { message } = req.body;
            const newApplication = new Applications({
                user: req.user.id,
                jobListing: req.job._id,
                message,
            });
            await newApplication.save();
            res.status(201).json({ msg: 'Application submitted successfully' });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    getUserApplications: async (req, res) => {
        try {
            const applications = await Applications.find({ user: req.user.id })
                .populate('jobListing', 'title category location')
                .sort({ submittedAt: -1 });
            res.json(applications);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getjobApplications: async (req, res) => {
        try {
            const applications = await Applications.find({ jobListing: req.job._id });
            res.json(applications);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateApplication: async (req, res) => {
        try {
            const { status } = req.body;
            if (!status || !VALID_STATUSES.includes(status)) {
                return res.status(400).json({ msg: 'Please provide a valid status.' });
            }
            await Applications.findOneAndUpdate({ _id: req.application._id }, { status });
            res.json({ msg: 'Application updated successfully' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteApplication: async (req, res) => {
        try {
            await Applications.findByIdAndDelete(req.application._id);
            res.json({ msg: 'Application deleted successfully' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = applicationsCntrl;
