const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Data storage (replace with a database in a real application)
let highestAlphabet = null;

// GET method endpoint
app.get('/api', (req, res) => {
  res.json({ operation_code: 'your_operation_code_here' });
});

// POST method endpoint
app.post('/api', (req, res) => {
  try {
    const {
      user_id,
      college_email,
      roll_number,
      numbers,
      alphabets,
    } = req.body;

    if (!Array.isArray(alphabets)) {
      throw new Error('Alphabets must be an array.');
    }

    const highestAlphabet = alphabets.reduce((max, current) =>
      current > max ? current : max
    );

    const response = {
      status: 'success',
      user_id,
      college_email,
      roll_number,
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    };

    // Store the highest alphabet globally
    highestAlphabet = highestAlphabet;

    res.json(response);
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
