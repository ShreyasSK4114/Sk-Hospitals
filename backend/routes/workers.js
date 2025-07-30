// backend/routes/workers.js

const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all workers
router.get('/', async (req, res) => {
  try {
    const [workers] = await db.query('SELECT * FROM other_workers_details');
    res.json(workers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching workers' });
  }
});

// Add a new worker
router.post('/', async (req, res) => {
  const { name, age, address, contact, monthly_salary } = req.body;
  try {
    await db.query(
      'INSERT INTO other_workers_details (name, age, address, contact, monthly_salary) VALUES (?, ?, ?, ?, ?)',
      [name, age, address, contact, monthly_salary]
    );
    res.json({ message: 'Worker added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error adding worker' });
  }
});

// (You can add edit and delete routes here as needed)

module.exports = router;
