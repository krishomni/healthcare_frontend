const express = require('express');
const DataManager = require('../lib/dataManager');
const router = express.Router();
const dataManager = new DataManager();

// Submit contact form (public endpoint)
router.post('/', async (req, res) => {
  try {
    const contactData = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      service: req.body.service,
      preferredDate: req.body.preferredDate,
      preferredTime: req.body.preferredTime,
      message: req.body.message,
      priority: req.body.priority || 'medium',
      source: 'website'
    };

    const newContact = await dataManager.addContact(contactData);
    
    // Here you could add email notification logic
    console.log('New contact submission:', newContact);
    
    res.status(201).json({ 
      message: 'Your message has been sent successfully. We will contact you soon.',
      contactId: newContact.id
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all contacts (admin endpoint)
router.get('/', async (req, res) => {
  try {
    let contacts = await dataManager.getContacts();
    const { page = 1, limit = 20, status, priority, search } = req.query;

    // Apply filters
    if (status) {
      contacts = contacts.filter(c => c.status === status);
    }
    if (priority) {
      contacts = contacts.filter(c => c.priority === priority);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      contacts = contacts.filter(c => 
        c.fullName?.toLowerCase().includes(searchLower) ||
        c.email?.toLowerCase().includes(searchLower) ||
        c.message?.toLowerCase().includes(searchLower)
      );
    }

    // Sort by creation date (newest first)
    contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedContacts = contacts.slice(startIndex, endIndex);

    res.json({
      contacts: paginatedContacts,
      total: contacts.length,
      totalPages: Math.ceil(contacts.length / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update contact status/notes
router.put('/:id', async (req, res) => {
  try {
    const updates = {
      status: req.body.status,
      notes: req.body.notes,
      priority: req.body.priority,
      assignedTo: req.body.assignedTo,
      followUpDate: req.body.followUpDate
    };

    // Remove undefined values
    Object.keys(updates).forEach(key => 
      updates[key] === undefined && delete updates[key]
    );

    const updatedContact = await dataManager.updateContact(req.params.id, updates);
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get contact statistics
router.get('/stats', async (req, res) => {
  try {
    const contacts = await dataManager.getContacts();
    
    const stats = {
      total: contacts.length,
      new: contacts.filter(c => c.status === 'new').length,
      contacted: contacts.filter(c => c.status === 'contacted').length,
      scheduled: contacts.filter(c => c.status === 'scheduled').length,
      completed: contacts.filter(c => c.status === 'completed').length,
      thisMonth: contacts.filter(c => {
        const contactDate = new Date(c.createdAt);
        const now = new Date();
        return contactDate.getMonth() === now.getMonth() && 
               contactDate.getFullYear() === now.getFullYear();
      }).length
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;