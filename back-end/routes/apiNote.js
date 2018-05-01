const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

/**
 * GET /note
 * To get all available notes.
 */
router.get('/', (req, res) => {
  Note.find((findErr, notes) => {
    if (findErr) {
      return res.json({
        success: false,
        message: findErr.message || 'Error at finding notes',
        result: [],
      });
    }
    if (notes) {
      return res.json({
        success: true,
        message: 'Listing all notes',
        result: notes,
      });
    }
    return res.json({
      success: false,
      message: 'There is no note',
      result: [],
    });
  });
}); 

/**
 * POST /note
 * To create new note.
 */
router.post('/', (req, res) => {
  const { title, body } = req.body;
  const note = new Note({
    title,
    body,
  });
  note.save((saveErr) => {
    if (saveErr) {
      return res.json({
        success: false,
        message: saveErr.message || 'Note has not been saved',
        result: {},
      });
    }
    return res.json({
      success: true,
      message: 'Note was succesfully saved',
      result: note,
    });
  });
});

/**
 * GET /note/:id
 * To get a note with spesific id.
 */
router.get('/:id', (req, res) => {
  Note.findById(req.params.id, (findErr, note) => {
    if (findErr) {
      return res.json({
        success: false,
        message: findErr.message || 'Error at finding note',
        result: {},
      });
    }
    if (note) {
      return res.json({
        success: true,
        message: 'Note was found',
        result: note,
      });
    }
    return res.json({
      success: false,
      message: 'Note was not found',
      result: {},
    });
  });
});

/**
 * DELETE /note
 * To delete a note with spesific id.
 */
router.delete('/:id', (req, res) => {
  Note.findByIdAndRemove(req.params.id, (findErr, deletedNote) => {
    if (findErr) {
      return res.json({
        success: false,
        message: findErr.message || 'Error at finding and deleting note',
        result: {},
      });
    }
    if (!deletedNote) {
      return res.json({
        success: false,
        message: 'Note not found',
        result: {},
      });
    }
    return res.json({
      success: true,
      message: 'Note was successfully deleted',
      result: deletedNote,
    });
  });
});

/**
 * PUT /note
 * To update an existing note with spesific id.
 */
router.put('/:id', (req, res) => {
  Note.findByIdAndUpdate(req.params.id, req.body, { new: true }, (updateErr, updatedNote) => {
    if (updateErr) {
      return res.json({
        success: false,
        message: updateErr.message || 'Error at updating note',
        result: {},
      });
    }
    if (!updatedNote) {
      return res.json({
        success: false,
        message: 'Note was not found',
        result: {},
      });
    }
    return res.json({
      success: false,
      message: 'Note was successfully updated',
      result: updatedNote,
    });
  });
});

module.exports = router;