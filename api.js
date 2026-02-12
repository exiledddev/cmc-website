// Install dependencies first: npm init -y && npm i express cors

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Get all staff
app.get('/staff', (req, res) => {
  try {
    const staff = JSON.parse(fs.readFileSync('staff.json', 'utf8'));
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read staff data' });
  }
});

// Add staff member (optional endpoint)
app.post('/staff', (req, res) => {
  try {
    const staff = JSON.parse(fs.readFileSync('staff.json', 'utf8'));
    staff.push(req.body); // { ign: "Player123", skin: "url" }
    fs.writeFileSync('staff.json', JSON.stringify(staff, null, 2));
    res.json({ msg: 'Staff added!', staff });
  } catch (err) {
    res.status(500).json({ error: 'Failed to write staff data' });
  }
});

app.listen(port, () => {
  console.log(`Staff API running on http://localhost:${port}`);
});
