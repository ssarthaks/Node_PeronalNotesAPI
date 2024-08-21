const express = require('express');
const { readNotes, writeNotes } = require('../utils/fileOperations');
const { validateNote } = require('../middleware/validator');
const router = express.Router();

// GET /notes: Retrieve all notes
router.get('/', (req, res) => {
    const notes = readNotes();
    res.json(notes);
});

// GET /notes/:id: Retrieve a specific note by ID
router.get('/:id', (req, res) => {
    const notes = readNotes();
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
});

// POST /notes: Add a new note
router.post('/', validateNote, (req, res) => {
    const notes = readNotes();
    const newNote = {
        id: notes.length ? notes[notes.length - 1].id + 1 : 1,
        title: req.body.title,
        content: req.body.content,
        date: new Date().toISOString()
    };
    notes.push(newNote);
    writeNotes(notes);
    res.status(201).json(newNote);
});

// PUT /notes/:id: Update a specific note by ID
router.put('/:id', validateNote, (req, res) => {
    const notes = readNotes();
    const noteIndex = notes.findIndex(n => n.id === parseInt(req.params.id));
    if (noteIndex === -1) return res.status(404).json({ error: 'Note not found' });

    notes[noteIndex] = { ...notes[noteIndex], title: req.body.title, content: req.body.content };
    writeNotes(notes);
    res.json(notes[noteIndex]);
});

// DELETE /notes/:id: Delete a specific note by ID
router.delete('/:id', (req, res) => {
    let notes = readNotes();
    notes = notes.filter(n => n.id !== parseInt(req.params.id));
    writeNotes(notes);
    res.status(204).send();
});

module.exports = router;
