const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

let orders = [];
let nextId = 1;

app.get("/", (req, res) => { res.sendFile(path.join(__dirname, "site.html")); });
app.get("/form", (req, res) => { res.sendFile(path.join(__dirname, "form.html")); });
app.get("/dashboard", (req, res) => { res.sendFile(path.join(__dirname, "dashboard.html")); });

app.post("/order", (req, res) => {
  const { name, phone, address, service, description } = req.body;
  const order = { id: nextId++, name, phone, address, service, description, status: "new" };
  orders.unshift(order);
  console.log("Новый заказ:", order);
  res.json({ message: "OK", id: order.id });
});

app.patch("/order/:id/status", (req, res) => {
  const order = orders.find(o => o.id == req.params.id);
  if (order) order.status = req.body.status;
  res.json({ message: "OK" });
});

app.delete("/order/:id", (req, res) => {
  orders = orders.filter(o => o.id != req.params.id);
  res.json({ message: "deleted" });
});

app.get("/orders", (req, res) => {
  res.json(orders);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log("Fixar running on port " + PORT); });
