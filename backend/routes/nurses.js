// backend/routes/nurses.js

const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all nurses
router.get('/', async (req, res) => {
  try {
    const [nurses] = await db.query('SELECT * FROM nurse_details');
    res.json(nurses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching nurses' });
  }
});

// Add a new nurse
router.post('/', async (req, res) => {
  const { name, age, address, contact, monthly_salary } = req.body;
  try {
    await db.query(
      'INSERT INTO nurse_details (name, age, address, contact, monthly_salary) VALUES (?, ?, ?, ?, ?)',
      [name, age, address, contact, monthly_salary]
    );
    res.json({ message: 'Nurse added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error adding nurse' });
  }
});

// (You can add edit and delete routes here as needed)

module.exports = router;
