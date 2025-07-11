const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./User');
const Note = require('./Note');
const auth = require('./authMiddleware');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const userExist = await User.findOne({ username });
  if (userExist) return res.status(400).json({ error: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.json({ message: 'User registered successfully' });
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

// Get Notes
app.get('/notes', auth, async (req, res) => {
  const notes = await Note.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(notes);
});

// Add Note
app.post('/notes', auth, async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ userId: req.userId, title, content });
  await note.save();
  res.json(note);
});

// Delete Note
app.delete('/notes/:id', auth, async (req, res) => {
  await Note.deleteOne({ _id: req.params.id, userId: req.userId });
  res.json({ message: 'Note deleted' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

// Update Note
app.put('/notes/:id', auth, async (req, res) => {
  const { title, content } = req.body;

  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId }, // ensure user owns the note
      { title, content },
      { new: true } // return updated note
    );

    if (!updatedNote) return res.status(404).json({ error: 'Note not found' });

    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// View a single note
app.get('/notes/:id', auth, async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, userId: req.userId });
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});
