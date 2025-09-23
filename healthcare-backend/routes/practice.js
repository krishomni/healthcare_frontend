const express = require('express');
const DataManager = require('../lib/dataManager');
const router = express.Router();
const dataManager = new DataManager();

// Get practice information
router.get('/', async (req, res) => {
  try {
    const data = await dataManager.readData();
    res.json(data.practice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update practice information
router.put('/', async (req, res) => {
  try {
    const updatedPractice = await dataManager.updatePractice(req.body);
    res.json(updatedPractice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
