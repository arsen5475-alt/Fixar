const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// главная
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/dashboard.html');
});

// форма
app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});

// заказ
app.post('/order', (req, res) => {
  console.log("Новый заказ:", req.body);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on ' + PORT);
});

https://fixar.onrender.com


const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

/* === ГЛАВНАЯ === */
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dashboard.html');
});

/* === DASHBOARD === */
app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/dashboard.html');
});

/* === ФОРМА === */
app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});

/* === API ЗАКАЗА === */
app.post('/order', (req, res) => {
  console.log("Новый заказ:", req.body);
  res.json({ success: true });
});

/* === СЕРВЕР === */
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port ' + PORT);
});
