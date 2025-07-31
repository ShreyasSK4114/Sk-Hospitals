const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all patients
router.get('/', async (req, res) => {
  try {
    const [patients] = await db.query('SELECT * FROM patient_details');
    res.json(patients);
  } catch (error) {
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
    res.status(500).json({ error: 'Server error adding patient' });
  }
});

// Update patient by puid
router.put('/:puid', async (req, res) => {
  const { puid } = req.params;
  const { name, age, address, doctor_recommended } = req.body;
  try {
    await db.query(
      'UPDATE patient_details SET name=?, age=?, address=?, doctor_recommended=? WHERE puid=?',
      [name, age, address, doctor_recommended, puid]
    );
    res.json({ message: 'Patient updated successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error updating patient' });
  }
});

// Delete patient by puid
router.delete('/:puid', async (req, res) => {
  const { puid } = req.params;
  try {
    await db.query('DELETE FROM patient_details WHERE puid=?', [puid]);
    res.json({ message: 'Patient deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error deleting patient' });
  }
});

module.exports = router;
