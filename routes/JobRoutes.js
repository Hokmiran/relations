const express = require('express');
const JobRoutes = express.Router();
const jobController = require('../controllers/JobController');


JobRoutes.get('/', jobController.getAllJobs);
JobRoutes.get('/:id', jobController.getJobById);
JobRoutes.post('/', jobController. createJob);
JobRoutes.patch('/:id', jobController.updateJobById);
JobRoutes.delete('/:id', jobController.deleteJobById);

module.exports = {
    JobRoutes
};