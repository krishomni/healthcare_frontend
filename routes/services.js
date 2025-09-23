const express = require('express');
const DataManager = require('../lib/dataManager');
const router = express.Router();
const dataManager = new DataManager();

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await dataManager.getServices();
    const { active } = req.query;
    
    if (active === 'true') {
      const activeServices = services.filter(s => s.isActive !== false);
      return res.json(activeServices);
    }
    
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single service
router.get('/:id', async (req, res) => {
  try {
    const services = await dataManager.getServices();
    const service = services.find(s => s.id === req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new service
router.post('/', async (req, res) => {
  try {
    const newService = await dataManager.addService(req.body);
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update service
router.put('/:id', async (req, res) => {
  try {
    const updatedService = await dataManager.updateService(req.params.id, req.body);
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete service
router.delete('/:id', async (req, res) => {
  try {
    await dataManager.deleteService(req.params.id);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
