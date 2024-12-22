const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Home Route (Serving HTML page)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
app.post('/api/service', require('./api/services'));
app.post('/api/order', require('./api/order'));
app.post('/api/refill', require('./api/refill'));
app.post('/api/refillStatus', require('./api/refillStatus'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
