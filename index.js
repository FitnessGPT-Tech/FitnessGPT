const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000; // Choose a port (you can change this if necessary)

// Middleware to parse JSON
app.use(bodyParser.json());

// Example route to handle FitnessGPT requests
app.post('/api/fitnessgpt', (req, res) => {
  const userMessage = req.body.message;  // This is where you'll receive user messages
  console.log('Message from user:', userMessage);

  // Respond with a simple message for now
  const response = {
    reply: `You said: "${userMessage}". How can I help you with your fitness goals?`,
  };

  res.json(response); // Send back the response in JSON format
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
