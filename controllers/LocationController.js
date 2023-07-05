const { Location } = require('../models/Location');
const { Job } = require('../models/Job');

// Controller actions
const locationController = {
  getAllLocations: async (req, res) => {
    try {
      const locations = await Location.find().populate('jobs');
      res.json(locations);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch locations' });
    }
  },

  createLocation: async (req, res) => {
    try {
      const { name, icon, jobs } = req.body;
      const location = new Location({
        name,
        icon,
        jobs,
      });
      await location.save();
      res.status(201).json(location);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to create location' });
    }
  },

  getLocationById: async (req, res) => {
    try {
      const { locationId } = req.params;
      const location = await Location.findById(locationId).populate('jobs');
      if (!location) {
        return res.status(404).json({ error: 'Location not found' });
      }
      res.json(location);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch location' });
    }
  },

  updateLocationById: async (req, res) => {
    try {
      const { locationId } = req.params;
      const { name, icon, jobs } = req.body;
      const location = await Location.findByIdAndUpdate(
        locationId,
        {
          name,
          icon,
          jobs,
        },
        { new: true }
      ).populate('jobs');
      if (!location) {
        return res.status(404).json({ error: 'Location not found' });
      }
      res.json(location);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to update location' });
    }
  },

  deleteLocationById: async (req, res) => {
    try {
      const { locationId } = req.params;
      const location = await Location.findByIdAndDelete(locationId);
      if (!location) {
        return res.status(404).json({ error: 'Location not found' });
      }
      res.json({ message: 'Location deleted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to delete location' });
    }
  },

  // addJobToLocation: async (req, res) => {
  //   try {
  //     const { locationId } = req.params;
  //     const { jobId } = req.body;

  //     const location = await Location.findById(locationId);
  //     if (!location) {
  //       return res.status(404).json({ error: 'Location not found' });
  //     }

  //     const job = await Job.findById(jobId);
  //     if (!job) {
  //       return res.status(404).json({ error: 'Job not found' });
  //     }

  //     location.jobs.push(job);
  //     job.locations.push(location);

  //     await Promise.all([location.save(), job.save()]);

  //     res.json(location);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     res.status(500).json({ error: 'Failed to add job to location' });
  //   }
  // },

  // removeJobFromLocation: async (req, res) => {
  //   try {
  //     const { locationId, jobId } = req.params;

  //     const location = await Location.findById(locationId);
  //     if (!location) {
  //       return res.status(404).json({ error: 'Location not found' });
  //     }

  //     const job = await Job.findById(jobId);
  //     if (!job) {
  //       return res.status(404).json({ error: 'Job not found' });
  //     }

  //     location.jobs.pull(job);
  //     job.locations.pull(location);

  //     await Promise.all([location.save(), job.save()]);

  //     res.json(location);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     res.status(500).json({ error: 'Failed to remove job from location' });
  //   }
  // },
};

module.exports = locationController;
