const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Ticket = require('../models/Ticket');

// Get all tickets
router.get('/', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.userId });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create ticket
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const ticket = new Ticket({
      title,
      description,
      status: status || 'Open',
      user: req.user.userId
    });

    const savedTicket = await ticket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    console.error('Ticket creation error:', error);
    res.status(500).json({ message: 'Error creating ticket' });
  }
});

// Update ticket
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const ticket = await Ticket.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { title, description, status },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json(ticket);
  } catch (error) {
    console.error('Ticket update error:', error);
    res.status(500).json({ message: 'Error updating ticket' });
  }
});

// Delete ticket
router.delete('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.userId 
    });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Ticket deletion error:', error);
    res.status(500).json({ message: 'Error deleting ticket' });
  }
});

module.exports = router;