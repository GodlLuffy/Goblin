require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({status: 'ok'}));

app.get('/contacts', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Database error'});
  }
});

app.post('/contacts', async (req, res) => {
  const {name, email, message} = req.body;
  if (!name || !message) return res.status(400).json({error: 'name and message required'});
  try {
    const [result] = await db.query('INSERT INTO contacts (name,email,message) VALUES (?,?,?)', [name, email || null, message]);
    res.status(201).json({id: result.insertId});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Database error'});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
