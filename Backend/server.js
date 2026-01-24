require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const { Design } = require('./db/mongo');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Simple API-style health for frontends expecting /api/*
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('/db-check', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 as ok');
    res.json({ ok: rows[0].ok === 1 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Shared helper to fetch contacts from MySQL
async function fetchContacts(req, res) {
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, subject, phone, message, created_at FROM contacts ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}

// Legacy route
app.get('/contacts', fetchContacts);

// API-style route
app.get('/api/contacts', fetchContacts);

async function saveContact(req, res) {
  const { name, email, subject, phone, message } = req.body;

  if (!name || !message) {
    return res
      .status(400)
      .json({ error: 'name and message are required fields' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO contacts (name, email, subject, phone, message) VALUES (?,?,?,?,?)',
      [name, email || null, subject || null, phone || null, message]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}

// Legacy POST route
app.post('/contacts', saveContact);

// Frontend uses this endpoint for the contact form
app.post('/api/contact', saveContact);

// MongoDB-powered designs API used by the frontend
app.get('/api/designs', async (req, res) => {
  try {
    const designs = await Design.find().sort({ createdAt: -1 }).lean();
    res.json(designs);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'Failed to load designs from MongoDB', details: err.message });
  }
});

app.post('/api/designs', async (req, res) => {
  const { name, description, rarity, theme, powerLevel } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .json({ error: 'name and description are required fields' });
  }

  try {
    const design = await Design.create({
      name,
      description,
      rarity,
      theme,
      powerLevel,
    });
    res.status(201).json(design);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'Failed to create design in MongoDB', details: err.message });
  }
});

// Serve frontend static files (index.html, script.js, style.css, img, etc.)
const publicDir = path.join(__dirname, '..');
app.use(express.static(publicDir));

// Fallback to index.html for any other GET route (for direct deep links)
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
