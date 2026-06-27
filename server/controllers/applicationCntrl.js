const Applications = require('../models/ApplicationModel.js');
const JobModel = require('../models/jobModel.js');

const applicationsCntrl = {
    createApplication: async (req, res) => {
        try {
            const jobListing=req.params.id;
            const { message } = req.body;
            const newApplication = new Applications({
                user:req.user.id,
                jobListing,
                message
            });
            await newApplication.save();
            res.status(201).json({ msg: "Application submitted successfully" });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err.message });
        }
    },
    getUserApplications: async (req, res) => {
        try {
            if (req.params.id !== req.user.id) {
                return res.status(403).json({ msg: "You are not authorized to view these applications." });
            }
            const userId = req.params.id;
            const applications = await Applications.find({ user: userId });
            if(!applications) return res.status(400).json({ msg: "No applications found" });
            res.json(applications);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getjobApplications: async (req, res) => {
        try {
            const job = await JobModel.findById(req.params.id);
            if (!job) return res.status(400).json({ msg: "Job does not exist." });
            if (job.createdBy.toString() !== req.user.id) {
                return res.status(403).json({ msg: "You are not authorized to view these applications." });
            }
            const applications = await Applications.find({ jobListing: req.params.id });
            if (!applications.length) return res.status(400).json({ msg: "No applications found" });
            res.json(applications);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateApplication: async (req, res) => {
        try {
            const application = await Applications.findById(req.params.id);
            if (!application) return res.status(400).json({ msg: "Application does not exist." });
            const job = await JobModel.findById(application.jobListing);
            if (!job || job.createdBy.toString() !== req.user.id) {
                return res.status(403).json({ msg: "You are not authorized to update this application." });
            }
            const { status } = req.body;
            await Applications.findOneAndUpdate({ _id: req.params.id }, { status });
            res.json({ msg: "Application updated successfully" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteApplication: async (req, res) => {
        try {
            const application = await Applications.findById(req.params.id);
            if (!application) return res.status(400).json({ msg: "Application does not exist." });
            if (application.user.toString() !== req.user.id) {
                return res.status(403).json({ msg: "You are not authorized to delete this application." });
            }
            await Applications.findByIdAndDelete(req.params.id);
            res.json({ msg: "Application deleted successfully" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

module.exports = applicationsCntrl;