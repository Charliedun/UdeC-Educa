const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true }  
}, {
    timestamps: true
})

// Creacion del metodo que cifre la contraseña
UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);    
}

//Comparar cifrados
UserSchema.methods.matchPassword = async function(password) { 
//La notacion ya no es => sino "function" para que this.password haga referencia a la almacenada en la base de datos
    return await bcrypt.compare(password, this.password);
}


module.exports = model ('User', UserSchema);