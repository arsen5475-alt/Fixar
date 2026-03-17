const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const db = new Database("orders.db");

db.exec("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, address TEXT, service TEXT, description TEXT, status TEXT DEFAULT 'new')");

app.get("/", (req, res) => { res.sendFile(path.join(__dirname, "site.html")); });
app.get("/form", (req, res) => { res.sendFile(path.join(__dirname, "form.html")); });
app.get("/dashboard", (req, res) => { res.sendFile(path.join(__dirname, "dashboard.html")); });

app.post("/order", (req, res) => {
  const { name, phone, address, service, description } = req.body;
  try {
    const stmt = db.prepare("INSERT INTO orders (name, phone, address, service, description) VALUES (?, ?, ?, ?, ?)");
    const result = stmt.run(name, phone, address, service, description);
    res.json({ message: "OK", id: result.lastInsertRowid });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/order/:id/status", (req, res) => {
  const { status } = req.body;
  db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, req.params.id);
  res.json({ message: "OK" });
});

app.delete("/order/:id", (req, res) => {
  db.prepare("DELETE FROM orders WHERE id = ?").run(req.params.id);
  res.json({ message: "deleted" });
});

app.get("/orders", (req, res) => {
  const rows = db.prepare("SELECT * FROM orders ORDER BY id DESC").all();
  res.json(rows);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log("Fixar running on port " + PORT); });
