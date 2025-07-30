// backend/routes/patients.js

const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all patients
router.get('/', async (req, res) => {
  try {
    const [patients] = await db.query('SELECT * FROM patient_details');
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching patients' });
  }
});

// Add a new patient
router.post('/', async (req, res) => {
  const { puid, name, age, address, doctor_recommended } = req.body;
  try {
    await db.query(
      'INSERT INTO patient_details (puid, name, age, address, doctor_recommended) VALUES (?, ?, ?, ?, ?)',
      [puid, name, age, address, doctor_recommended]
    );
    res.json({ message: 'Patient added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error adding patient' });
  }
});

// (Add edit and delete routes as needed)

module.exports = router;
