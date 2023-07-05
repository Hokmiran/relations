const express = require('express');
const LocationRoutes = express.Router();
const locationController = require('../controllers/LocationController');


LocationRoutes.get('/', locationController.getAllLocations);
LocationRoutes.get('/:id', locationController.getLocationById);
LocationRoutes.post('/', locationController.createLocation);
LocationRoutes.patch('/:id', locationController.updateLocationById);
LocationRoutes.delete('/:id', locationController.deleteLocationById);

module.exports = {
    LocationRoutes
};