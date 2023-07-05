const { Job } = require('../models/Job');
const { Location } = require('../models/Location');

// Controller actions
const jobController = {
  getAllJobs: async (req, res) => {
    try {
      const jobs = await Job.find().populate('locations');
      res.json(jobs);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch jobs' });
    }
  },

  createJob: async (req, res) => {
    try {
      const { title, summary, description, minSalary, maxSalary, locations } = req.body;
      const job = new Job({
        title,
        summary,
        description,
        minSalary,
        maxSalary,
        locations,
      });

      // Update the related locations' jobs array
      await Location.updateMany({ _id: { $in: locations } }, { $push: { jobs: job._id } });

      await job.save();
      res.status(201).json(job);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to create job' });
    }
  },

  getJobById: async (req, res) => {
    try {
      const { jobId } = req.params;
      const job = await Job.findById(jobId).populate('locations');
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }
      res.json(job);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch job' });
    }
  },

  updateJobById: async (req, res) => {
    try {
      const { jobId } = req.params;
      const { title, summary, description, minSalary, maxSalary, locations } = req.body;

      // Update the related locations' jobs array
      const job = await Job.findById(jobId);
      const previousLocations = job.locations;

      await Location.updateMany(
        { _id: { $in: previousLocations } },
        { $pull: { jobs: job._id } }
      );

      await Location.updateMany({ _id: { $in: locations } }, { $push: { jobs: job._id } });

      // Update the job
      const updatedJob = await Job.findByIdAndUpdate(
        jobId,
        {
          title,
          summary,
          description,
          minSalary,
          maxSalary,
          locations,
        },
        { new: true }
      ).populate('locations');

      if (!updatedJob) {
        return res.status(404).json({ error: 'Job not found' });
      }

      res.json(updatedJob);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to update job' });
    }
  },

  deleteJobById: async (req, res) => {
    try {
      const { jobId } = req.params;

      // Find the job and retrieve the associated locations
      const job = await Job.findById(jobId);
      const locations = job.locations;

      // Remove the job from the related locations' jobs array
      await Location.updateMany({ _id: { $in: locations } }, { $pull: { jobs: job._id } });

      // Delete the job
      const deletedJob = await Job.findByIdAndDelete(jobId);

      if (!deletedJob) {
        return res.status(404).json({ error: 'Job not found' });
      }

      res.json({ message: 'Job deleted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to delete job' });
    }
  },
};

module.exports = jobController;
