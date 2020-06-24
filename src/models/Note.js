const {Schema, model} = require('mongoose');

// Esquema del objeto
const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
}, { 
    timestamps: true //Creado y actualizado por ultima vez
})

module.exports = model ('Note', NoteSchema);// Modelo de la Nota