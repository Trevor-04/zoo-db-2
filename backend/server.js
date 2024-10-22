const express = require('express');
const {url, port} = require("../src/config.json");
const axios = require('axios');
const cors = require('cors');

// Routes
const animalRoutes = require('./routes/animals');
const eventsRoutes = require('./routes/events');
const loginRoutes = require('./routes/login');
const exhibitsRoutes = require('./routes/exhibits');
const membersRoutes = require('./routes/members');
const reportsRoutes = require('./routes/reports');
const ticketsRoutes = require('./routes/tickets');

const app = express();

app.use(cors()); // allows us to handle front end requests

app.use(express.json()); // allows us to read json files and handle POST or PUT requests 

app.use('/animals', animalRoutes);
app.use('/events', eventsRoutes);
app.use('/exhibits', exhibitsRoutes);
app.use('/login', loginRoutes);
app.use('/members', membersRoutes);
app.use('/reports', reportsRoutes);
app.use('/tickets', ticketsRoutes);


axios.get(`${url}:${port}/exhibits/`).then(d => console.log(d.data));



// Start the server
app.listen(port, async () => {
    console.log(`Server is running on ${url}:${port}`);
});

