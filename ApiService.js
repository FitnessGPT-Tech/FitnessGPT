export async function sendMessageToFitnessGPT(message) {
  try {
    const response = await fetch('http://localhost:3000/api/fitnessgpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('Error connecting to FitnessGPT:', error);
    return 'There was an issue connecting to the server.';
  }
}
