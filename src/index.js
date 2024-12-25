const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/api/tasks', async (req, res) => {
  try {
    const projectId = req.query.project_id || 'y5QHG1sAuSRqd';
    
    const response = await axios.get(`https://openapi.niftypm.com/api/v1.0/tasks`, {
      params: {
        project_id: projectId
      },
      headers: {
        'Authorization': `Bearer ${process.env.NIFTY_API_TOKEN}`
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch tasks',
      message: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});