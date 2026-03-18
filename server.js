const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// 👉 ГЛАВНАЯ СТРАНИЦА (сайт)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'site.html'));
});

// 👉 ФОРМА
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

// 👉 DASHBOARD
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// 👉 БАЗА
let orders = [];

// 👉 ПОЛУЧИТЬ ЗАКАЗЫ
app.get('/orders', (req, res) => {
  res.json(orders);
});

// 👉 СОЗДАТЬ ЗАКАЗ
app.post('/order', (req, res) => {
  const order = {
    id: Date.now(),
    ...req.body,
    status: 'new'
  };

  orders.push(order);

  console.log("NEW ORDER:", order);

  res.json({ success: true });
});

// 👉 ОБНОВИТЬ СТАТУС
app.post('/order-status', (req, res) => {
  const { id, status } = req.body;

  orders = orders.map(o =>
    o.id == id ? { ...o, status } : o
  );

  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
