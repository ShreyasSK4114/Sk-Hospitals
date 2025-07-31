const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all workers
router.get('/', async (req, res) => {
  try {
    const [workers] = await db.query('SELECT * FROM other_workers_details');
    res.json(workers);
  } catch (error) {
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
    res.status(500).json({ error: 'Server error adding worker' });
  }
});

// Update worker by name
router.put('/:name', async (req, res) => {
  const { name } = req.params;
  const { age, address, contact, monthly_salary } = req.body;
  try {
    await db.query(
      'UPDATE other_workers_details SET age=?, address=?, contact=?, monthly_salary=? WHERE name=?',
      [age, address, contact, monthly_salary, name]
    );
    res.json({ message: 'Worker updated successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error updating worker' });
  }
});

// Delete worker by name
router.delete('/:name', async (req, res) => {
  const { name } = req.params;
  try {
    await db.query('DELETE FROM other_workers_details WHERE name=?', [name]);
    res.json({ message: 'Worker deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error deleting worker' });
  }
});

module.exports = router;
