const JobModel=require('../models/jobModel.js');

const jobCntrl = {
    createJob: async (req, res) => {
        try {
            const { title, description, location, requirements, personalInfo} = req.body;
            const newJob = new JobModel({
                title,
                description,
                location,
                requirements,
                personalInfo,
                createdBy:req.user.id
            });
            await newJob.save();
            res.status(201).json(newJob.id);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    getJobs: async (req, res) => {
        try {
            const category = req.query.category;
            const filter = category ? { category } : {};
            const jobs = await JobModel.find(filter);
            res.json(jobs);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getJobById: async (req, res) => {
        try {
            const job = await JobModel.findById(req.params.id);
            if(!job) return res.status(400).json({msg:"Job does not exist."});
            res.json(job);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateJob: async (req, res) => {
        try {
            const { title, description, location, requirements, personalInfo } = req.body;
            const job = await JobModel.findById(req.params.id);
            if (!job) return res.status(400).json({ msg: "Job does not exist." });
            if(job.createdBy.toString() !== req.user.id) return res.status(400).json({msg:"You are not authorized to update this job."});
            await JobModel.findOneAndUpdate({ _id: req.params.id }, {
                title,
                category,
                description,
                location,
                requirements,
                personalInfo
            });
            res.json({ msg: "Job Updated Successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    userJobs: async(req,res)=>{
            try {
                const userId = req.params.id;
                const jobs = await JobModel.find({ createdBy: userId });
                if (!jobs.length) return res.status(400).json({ msg: "No jobs found" });
                res.json(jobs);
            } catch (err) {
                return res.status(500).json({ msg: err.message });
            }
        
    },

    deleteJob: async (req, res) => {
        try {
            const job = await JobModel.findById(req.params.id);
            if (!job) return res.status(400).json({ msg: "Job does not exist." });
            if(job.createdBy.toString() !== req.user.id) return res.status(400).json({msg:"You are not authorized to update this job."});
            await JobModel.findByIdAndDelete(req.params.id);
            res.json({ msg: "Job Deleted Successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

module.exports= jobCntrl;