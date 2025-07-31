import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [form, setForm] = useState({
    name: '', age: '', address: '', contact: '', monthly_salary: ''
  });
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [message, setMessage] = useState('');

  // Fetch all workers
  const fetchWorkers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/workers`);
      setWorkers(res.data);
    } catch {
      setMessage('Failed to fetch workers');
    }
  };

  useEffect(() => { fetchWorkers(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Add or update worker
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/workers/${editName}`, form);
        setMessage('Worker updated!');
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/workers`, form);
        setMessage('Worker added!');
      }
      setForm({ name: '', age: '', address: '', contact: '', monthly_salary: '' });
      setEditing(false);
      setEditName('');
      fetchWorkers();
    } catch {
      setMessage('Add/Update failed');
    }
  };

  // Load data into form for editing
  const handleEdit = worker => {
    setForm({ ...worker });
    setEditing(true);
    setEditName(worker.name);
  };

  // Delete a worker
  const handleDelete = async name => {
    if (!window.confirm('Delete this worker?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/workers/${name}`);
      setMessage('Worker deleted');
      fetchWorkers();
    } catch {
      setMessage('Delete failed');
    }
  };

  return (
    <div>
      <h2>Workers</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required disabled={editing} />
        <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="Age" required />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required />
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact" required />
        <input name="monthly_salary" type="number" value={form.monthly_salary} onChange={handleChange} placeholder="Monthly Salary" required />
        <button type="submit">{editing ? 'Update' : 'Add'} Worker</button>
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

      <h3>Worker List</h3>
      <ul>
        {workers.map(worker => (
          <li key={worker.name}>
            {worker.name} (Age: {worker.age}) - Contact: {worker.contact}
            <button onClick={() => handleEdit(worker)} style={{ marginLeft: "10px" }}>Edit</button>
            <button onClick={() => handleDelete(worker.name)} style={{ marginLeft: "5px" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workers;
