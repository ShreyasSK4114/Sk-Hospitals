import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Nurses = () => {
  const [nurses, setNurses] = useState([]);
  const [form, setForm] = useState({
    name: '', age: '', address: '', contact: '', monthly_salary: ''
  });
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [message, setMessage] = useState('');

  // Fetch nurses from backend
  const fetchNurses = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/nurses`);
      setNurses(res.data);
    } catch {
      setMessage('Failed to fetch nurses');
    }
  };

  useEffect(() => { fetchNurses(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Submit form to add or update nurse
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/nurses/${editName}`, form);
        setMessage('Nurse updated!');
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/nurses`, form);
        setMessage('Nurse added!');
      }
      setForm({ name: '', age: '', address: '', contact: '', monthly_salary: '' });
      setEditing(false);
      setEditName('');
      fetchNurses();
    } catch {
      setMessage('Add/Update failed');
    }
  };

  // Edit button click
  const handleEdit = nurse => {
    setForm({ ...nurse });
    setEditing(true);
    setEditName(nurse.name);
  };

  // Delete nurse
  const handleDelete = async name => {
    if (!window.confirm('Delete this nurse?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/nurses/${name}`);
      setMessage('Nurse deleted');
      fetchNurses();
    } catch {
      setMessage('Delete failed');
    }
  };

  return (
    <div>
      <h2>Nurses</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required disabled={editing} />
        <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="Age" required />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required />
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact" required />
        <input name="monthly_salary" type="number" value={form.monthly_salary} onChange={handleChange} placeholder="Monthly Salary" required />
        <button type="submit">{editing ? 'Update' : 'Add'} Nurse</button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setForm({ name: '', age: '', address: '', contact: '', monthly_salary: '' });
              setEditName('');
            }}
            style={{ marginLeft: '10px' }}
          >
            Cancel
          </button>
        )}
      </form>

      {message && <p>{message}</p>}

      <h3>Nurse List</h3>
      <ul>
        {nurses.map(nurse => (
          <li key={nurse.name}>
            {nurse.name} (Age: {nurse.age}) - Contact: {nurse.contact}
            <button onClick={() => handleEdit(nurse)} style={{ marginLeft: "10px" }}>Edit</button>
            <button onClick={() => handleDelete(nurse.name)} style={{ marginLeft: "5px" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nurses;
