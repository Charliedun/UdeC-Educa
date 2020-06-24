const notesCtrl = {};

const Note =  require('../models/Note');//Modelo de la nota

notesCtrl.renderNotesForm = (req, res) => {
    console.log(req.user);
    res.render('notes/new-notes');
}

notesCtrl.createNewNote = async (req, res) => {
    const {title, description} = req.body; //Crear las constantes entre {} y tomar dato del form
    //Guardar en la base de datos
    const newNote = new Note({title,description});
    newNote.user = req.user.id;
    await newNote.save();//Guarda el objeto dentro de MongoDB
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/notes');
}

notesCtrl.renderNotes = async(req, res) => {
    const notes = await Note.find({user: req.user.id}).sort({date: 'desc'}); 
    res.render('notes/all-notes', {notes});
}

notesCtrl.renderEditForm = async(req, res) => {
    const note = await Note.findById(req.params.id);
    if (note.user != req.user.id) {
        req.flash('error_msg', 'Usuario no autorizado');
        return res.redirect('/notes');
    } 
    res.render('notes/edit-notes', {note});//renderiza plantilla y envía datos de la nota
}

notesCtrl.updateNote = async(req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Note Update Succesfully');
    res.redirect('/notes');
}

notesCtrl.deleteNote = async (req, res) => {    
    await Note.findByIdAndDelete(req.params.id);//eliminar nota
    req.flash('success_msg', 'Note Deleted Successfully');
    res.redirect('/notes');
}

module.exports = notesCtrl;