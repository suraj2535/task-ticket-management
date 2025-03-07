const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Ticket = require('../models/Ticket');

// Get all tickets
router.get('/', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create ticket
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTicket = new Ticket({
      title,
      description,
      user: req.user.id
    });
    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;