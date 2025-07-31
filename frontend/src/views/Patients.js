import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    puid: '', name: '', age: '', address: '', doctor_recommended: ''
  });
  const [editing, setEditing] = useState(false);
  const [editPuid, setEditPuid] = useState('');
  const [message, setMessage] = useState('');

  // Fetch all patients
  const fetchPatients = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/patients`);
      setPatients(res.data);
    } catch {
      setMessage('Failed to fetch patients');
    }
  };

  useEffect(() => { fetchPatients(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Add or update a patient
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const patientData = {
        ...form,
        puid: Number(form.puid),
        age: form.age ? Number(form.age) : null
      };

      if (editing) {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/patients/${editPuid}`, patientData);
        setMessage('Patient updated!');
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/patients`, patientData);
        setMessage('Patient added!');
      }

      setForm({ puid: '', name: '', age: '', address: '', doctor_recommended: '' });
      setEditing(false);
      setEditPuid('');
      fetchPatients();
    } catch (error) {
      setMessage(error.response?.data?.error || 'Add/Update failed');
    }
  };

  // Load selected patient into form
  const handleEdit = patient => {
    setForm({
      puid: patient.puid,
      name: patient.name,
      age: patient.age,
      address: patient.address,
      doctor_recommended: patient.doctor_recommended
    });
    setEditing(true);
    setEditPuid(patient.puid);
  };

  // Delete a patient
  const handleDelete = async puid => {
    if (!window.confirm('Delete this patient?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/patients/${puid}`);
      setMessage('Patient deleted');
      fetchPatients();
    } catch {
      setMessage('Delete failed');
    }
  };

  return (
    <div>
      <h2>Patients</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="puid"
          type="number"
          value={form.puid}
          onChange={handleChange}
          placeholder="Patient ID"
          required
          disabled={editing}
        />
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          name="doctor_recommended"
          value={form.doctor_recommended}
          onChange={handleChange}
          placeholder="Doctor Recommended"
        />
        <button type="submit">{editing ? 'Update' : 'Add'} Patient</button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setForm({ puid: '', name: '', age: '', address: '', doctor_recommended: '' });
              setEditPuid('');
            }}
            style={{ marginLeft: '10px' }}
          >
            Cancel
          </button>
        )}
      </form>

      {message && <p>{message}</p>}

      <h3>Patient List</h3>
      <ul>
        {patients.map(patient => (
          <li key={patient.puid}>
            {patient.puid} - {patient.name} (Age: {patient.age}) - {patient.address} - Doctor: {patient.doctor_recommended}
            <button onClick={() => handleEdit(patient)} style={{ marginLeft: "10px" }}>Edit</button>
            <button onClick={() => handleDelete(patient.puid)} style={{ marginLeft: "5px" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Patients;
