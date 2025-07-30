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

// (You can add edit and delete routes here as needed)

module.exports = router;
