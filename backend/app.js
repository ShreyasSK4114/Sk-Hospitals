// backend/app.js
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// CORS
const cors = require('cors');
app.use(cors());

// routes for other
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const nurseRoutes = require('./routes/nurses');
const workerRoutes = require('./routes/workers');

//routes to use it

app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/nurses', nurseRoutes);
app.use('/workers', workerRoutes);


// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to SK Hospitals backend!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
