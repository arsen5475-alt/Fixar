const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
const db = new sqlite3.Database("orders.db");
db.run("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, address TEXT, service TEXT, description TEXT, status TEXT DEFAULT 'new')");
app.get("/", (req, res) => { res.sendFile(path.join(__dirname, "site.html")); });
app.get("/form", (req, res) => { res.sendFile(path.join(__dirname, "form.html")); });
app.get("/dashboard", (req, res) => { res.sendFile(path.join(__dirname, "dashboard.html")); });
app.post("/order", (req, res) => {
const { name, phone, address, service, description } = req.body;
db.run("INSERT INTO orders (name, phone, address, service, description) VALUES (?, ?, ?, ?, ?)", [name, phone, address, service, description], function(err) {
if (err) return res.status(500).json({ error: err.message });
res.json({ message: "OK", id: this.lastID });
});
});
app.get("/orders", (req, res) => {
db.all("SELECT * FROM orders ORDER BY id DESC", (err, rows) => {
if (err) return res.status(500).json({ error: err.message });
res.json(rows);
});
});
app.delete("/order/:id", (req, res) => {
db.run("DELETE FROM orders WHERE id = ?", [req.params.id], function(err) {
if (err) return res.status(500).json({ error: err.message });
res.json({ message: "deleted" });
});
});
app.listen(3000, () => { console.log("Fixar running on port 3000"); });
