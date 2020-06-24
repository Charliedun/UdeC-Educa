const { Router } = require('express');
const router = Router();

const { 
    renderNotesForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote
} = require('../controller/notes.controller');

const {isAuthenticated} = require ('../helpers/auth');

//New Note
router.get('/notes/add', isAuthenticated, renderNotesForm);

router.post('/notes/newNote', isAuthenticated, createNewNote);

//Get all notes
router.get('/notes', isAuthenticated, renderNotes);

//Edit Notes
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);

router.put('/notes/edit/:id', isAuthenticated, updateNote); //put = actualizar

//Delete Note
router.delete('/notes/delete/:id', isAuthenticated, deleteNote); //delete = eliminar

module.exports = router;
