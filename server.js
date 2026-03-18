const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/site.html');
});

app.post('/order', (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

const PORT = process.env.PORT;

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on ' + PORT);
});
