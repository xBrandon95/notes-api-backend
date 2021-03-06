const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let notes = [
  {
    id: 1,
    title: 'lorem1',
    content: 'lorem ipsum',
  },
  {
    id: 2,
    title: 'lorem2',
    content: 'lorem ipsum',
  },
  {
    id: 3,
    title: 'lorem3',
    content: 'lorem ipsum',
  },
];

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(400).end();
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post('/api/notes', (req, res) => {
  const note = req.body;

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing',
    });
  }

  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString(),
  };

  notes = [...notes, newNote];
  res.status(201).json(newNote);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
