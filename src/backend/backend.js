const express = require('express');
const app = express();
const port = 5002;

app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/login', (req, res) => {
  const { name, password } = req.body;
  // Noe logikk inn her
  if (name === 'admin' && password === 'password') {
    res.send('Login successful');
  } else {
    res.status(401).send('Login failed');
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});