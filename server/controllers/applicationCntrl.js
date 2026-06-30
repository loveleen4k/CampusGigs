const Applications = require('../models/ApplicationModel.js');
const {
    normalizeStatus,
    isValidStatus,
} = require('../constants/applicationStatuses.js');

const serializeApplication = (application) => {
    const doc = application.toObject ? application.toObject() : application;
    const status = normalizeStatus(doc.status);

    return {
        ...doc,
        status,
        statusHistory: (doc.statusHistory || []).map((entry) => ({
            ...entry,
            status: normalizeStatus(entry.status),
        })),
    };
};

const applicationsCntrl = {
    createApplication: async (req, res) => {
        try {
            const { message } = req.body;
            const now = new Date();
            const newApplication = new Applications({
                user: req.user.id,
                jobListing: req.job._id,
                message,
                status: 'submitted',
                statusUpdatedAt: now,
                statusHistory: [{ status: 'submitted', updatedAt: now }],
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
            res.json(applications.map(serializeApplication));
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getjobApplications: async (req, res) => {
        try {
            const applications = await Applications.find({ jobListing: req.job._id })
                .populate('user', 'name email skills jobPreferences')
                .sort({ submittedAt: -1 });
            res.json(applications.map(serializeApplication));
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateApplication: async (req, res) => {
        try {
            const { status } = req.body;
            if (!status || !isValidStatus(status)) {
                return res.status(400).json({ msg: 'Please provide a valid application status.' });
            }

            const normalizedStatus = normalizeStatus(status);
            const currentStatus = normalizeStatus(req.application.status);

            if (normalizedStatus === currentStatus) {
                return res.json({
                    msg: 'Application status is already up to date.',
                    application: serializeApplication(req.application),
                });
            }

            const now = new Date();
            const updatedApplication = await Applications.findByIdAndUpdate(
                req.application._id,
                {
                    status: normalizedStatus,
                    statusUpdatedAt: now,
                    $push: { statusHistory: { status: normalizedStatus, updatedAt: now } },
                },
                { new: true }
            )
                .populate('user', 'name email skills jobPreferences')
                .populate('jobListing', 'title category location');

            res.json({
                msg: 'Application status updated successfully.',
                application: serializeApplication(updatedApplication),
            });
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
