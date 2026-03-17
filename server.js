const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// главная страница
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/site.html');
});

// API
app.post('/order', (req, res) => {
  console.log('Новый заказ:', req.body);
  res.json({ success: true });
});

// ВАЖНО: Railway PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('Fixar running on port ' + PORT);
});
