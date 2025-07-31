import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: '', specialisation: '', age: '', address: '', contact: '', fees: '', monthly_salary: '',
  });
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [message, setMessage] = useState('');

  // Fetch doctor list
  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/doctors`);
      setDoctors(res.data);
    } catch {
      setMessage('Failed to fetch doctors');
    }
  };

  useEffect(() => { fetchDoctors(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update doctor
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/doctors/${editName}`, form);
        setMessage('Doctor updated!');
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/doctors`, form);
        setMessage('Doctor added!');
      }
      setForm({ name: '', specialisation: '', age: '', address: '', contact: '', fees: '', monthly_salary: '' });
      setEditing(false);
      setEditName('');
      fetchDoctors();
    } catch {
      setMessage('Add/Update failed');
    }
  };

  // Prepare form for editing
  const handleEdit = (doc) => {
    setForm({ ...doc });
    setEditing(true);
    setEditName(doc.name);
  };

  // Delete a doctor
  const handleDelete = async (name) => {
    if (!window.confirm('Delete this doctor?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/doctors/${name}`);
      setMessage('Doctor deleted');
      fetchDoctors();
    } catch {
      setMessage('Delete failed');
    }
  };

  return (
    <div>
      <h2>Doctors</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required disabled={editing} />
        <input name="specialisation" value={form.specialisation} onChange={handleChange} placeholder="Specialisation" required />
        <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="Age" required />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required />
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact" required />
        <input name="fees" type="number" value={form.fees} onChange={handleChange} placeholder="Fees" required />
        <input name="monthly_salary" type="number" value={form.monthly_salary} onChange={handleChange} placeholder="Monthly Salary" required />
        <button type="submit">{editing ? 'Update' : 'Add'} Doctor</button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setForm({ name: '', specialisation: '', age: '', address: '', contact: '', fees: '', monthly_salary: '' });
              setEditName('');
            }}
            style={{ marginLeft: '10px' }}
          >
            Cancel
          </button>
        )}
      </form>

      {message && <p>{message}</p>}

      <h3>Doctor List</h3>
      <ul>
        {doctors.map((doc) => (
          <li key={doc.name}>
            {doc.name} - {doc.specialisation} (Age: {doc.age}) - Contact: {doc.contact}
            <button onClick={() => handleEdit(doc)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(doc.name)} style={{ marginLeft: '5px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Doctors;
