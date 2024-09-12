const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ticketRoutes = require('./routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use(bodyParser.json());

// Use ticket routes
app.use('/api', ticketRoutes);

app.listen(process.env.PORT, () => {
  console.log(`
    Server is running on port ${process.env.PORT}
    http://${process.env.HOST}:${process.env.PORT}/api/
    `);
});
