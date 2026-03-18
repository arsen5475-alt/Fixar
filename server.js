const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(__dirname)); // ВАЖНО

let orders = [];

// отправка заказа
app.post('/order', (req, res) => {
  const order = {
    id: Date.now(),
    ...req.body
  };

  orders.push(order);
  console.log("Новый заказ:", order);

  res.json({ success: true });
});

// получить заказы
app.get('/orders', (req, res) => {
  res.json(orders);
});

// страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'site.html'));
});

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started"));
