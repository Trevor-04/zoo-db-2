const express = require('express');
const cors = require('cors');
const animalRoutes = require('./routes/animals');

const app = express();
const PORT = 5000; // replace this whenever we can 

app.use(cors());

app.use(express.json());

app.use('/animals', animalRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

