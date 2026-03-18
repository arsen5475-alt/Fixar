const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/dashboard.html');
});

app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});

app.post('/order', (req, res) => {
  console.log("Новый заказ:", req.body);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on ' + PORT);
});
