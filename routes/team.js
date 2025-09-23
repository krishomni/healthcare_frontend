const express = require('express');
const DataManager = require('../lib/dataManager');
const router = express.Router();
const dataManager = new DataManager();

// Get all team members
router.get('/', async (req, res) => {
  try {
    const team = await dataManager.getTeam();
    const { active } = req.query;
    
    if (active === 'true') {
      const activeMembers = team.filter(m => m.isActive !== false);
      return res.json(activeMembers);
    }
    
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single team member
router.get('/:id', async (req, res) => {
  try {
    const team = await dataManager.getTeam();
    const member = team.find(m => m.id === req.params.id);
    
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new team member
router.post('/', async (req, res) => {
  try {
    const newMember = await dataManager.addTeamMember(req.body);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update team member
router.put('/:id', async (req, res) => {
  try {
    const updatedMember = await dataManager.updateTeamMember(req.params.id, req.body);
    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete team member
router.delete('/:id', async (req, res) => {
  try {
    await dataManager.deleteTeamMember(req.params.id);
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
