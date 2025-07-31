const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all nurses
router.get('/', async (req, res) => {
  try {
    const [nurses] = await db.query('SELECT * FROM nurse_details');
    res.json(nurses);
  } catch (error) {
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
    res.status(500).json({ error: 'Server error adding nurse' });
  }
});

// Update nurse by name
router.put('/:name', async (req, res) => {
  const { name } = req.params;
  const { age, address, contact, monthly_salary } = req.body;
  try {
    await db.query(
      'UPDATE nurse_details SET age=?, address=?, contact=?, monthly_salary=? WHERE name=?',
      [age, address, contact, monthly_salary, name]
    );
    res.json({ message: 'Nurse updated successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error updating nurse' });
  }
});

// Delete nurse by name
router.delete('/:name', async (req, res) => {
  const { name } = req.params;
  try {
    await db.query('DELETE FROM nurse_details WHERE name=?', [name]);
    res.json({ message: 'Nurse deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error deleting nurse' });
  }
});

module.exports = router;
