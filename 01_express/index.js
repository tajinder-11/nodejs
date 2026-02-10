const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.end('You are at home page');
});

app.get('/contact-us', (req, res) => {
  res.end('Please contact me');
});

app.get('/tweets', (req, res) => {
  res.end('Here are your tweets');
});

app.post('/tweet', (req, res) => {
  res.end('Tweet created successfully');
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
