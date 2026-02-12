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
    res.json({ success: true, added: { ign, rank } });
  } catch (err) {
    console.error(err);
    res.json({ success: false, error: err.message || 'Unknown error' });
  }
});

// DELETE staff member by IGN
app.delete('/staff', (req, res) => {
    const { ign } = req.body;

    if (!ign) return res.json({ success: false, error: 'Missing IGN' });

    try {
        const staff = JSON.parse(fs.readFileSync('staff.json', 'utf8'));
        const index = staff.findIndex(s => s.ign.toLowerCase() === ign.toLowerCase());

        if (index === -1) {
            return res.json({ success: false, error: 'Staff member not found' });
        }

        const removed = staff.splice(index, 1)[0];
        fs.writeFileSync('staff.json', JSON.stringify(staff, null, 2));

        res.json({ success: true, removed });
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: err.message });
    }
});

app.listen(port, () => {
  console.log(`Staff API running on http://localhost:${port}`);
});
