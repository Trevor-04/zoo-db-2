const fetch = require('node-fetch')
const express = require('express');
const cors = require('cors');

// Routes
const animalRoutes = require('./routes/animals');
const eventsRoutes = require('./routes/events');
const loginRoutes = require('./routes/login');
const membersRoutes = require('./routes/members');
const reportsRoutes = require('./routes/reports');
const ticketsRoutes = require('./routes/tickets');

const app = express();
const PORT = 3000; // replace this whenever we can 

app.use(cors()); // allows us to handle front end requests

app.use(express.json()); // allows us to read json files and handle POST or PUT requests 

app.use('/animals', animalRoutes);
app.use('/events', eventsRoutes);
app.use('/login', loginRoutes);
app.use('/members', membersRoutes);
app.use('/reports', reportsRoutes);
app.use('/tickets', ticketsRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

