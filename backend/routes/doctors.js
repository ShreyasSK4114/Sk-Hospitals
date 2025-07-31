// backend/routes/doctors.js

const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const [doctors] = await db.query('SELECT * FROM doctor_details');
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching doctors' });
  }
});

// Add a new doctor
router.post('/', async (req, res) => {
  const { name, specialisation, age, address, contact, fees, monthly_salary } = req.body;
  try {
    await db.query(
      'INSERT INTO doctor_details (name, specialisation, age, address, contact, fees, monthly_salary) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, specialisation, age, address, contact, fees, monthly_salary]
    );
    res.json({ message: 'Doctor added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error adding doctor' });
  }
});

// Update doctor (PUT /doctors/:name)
router.put('/:name', async (req, res) => {
  const { specialisation, age, address, contact, fees, monthly_salary } = req.body;
  try {
    await db.query(
      'UPDATE doctor_details SET specialisation=?, age=?, address=?, contact=?, fees=?, monthly_salary=? WHERE name=?',
      [specialisation, age, address, contact, fees, monthly_salary, req.params.name]
    );
    res.json({ message: 'Doctor updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error updating doctor' });
  }
});

// Delete doctor (DELETE /doctors/:name)
router.delete('/:name', async (req, res) => {
  try {
    await db.query('DELETE FROM doctor_details WHERE name=?', [req.params.name]);
    res.json({ message: 'Doctor deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error deleting doctor' });
  }
});

// (You can add edit and delete routes here as needed)

module.exports = router;
