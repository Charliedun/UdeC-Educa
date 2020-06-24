const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash'); 
const session = require('express-session'); 
const passport = require('passport');

// Inicializaciones
const app = express();
require('./config/passport');

// Configuraciones
app.set('port', process.env.PORT || 5000); // Indica el puerto disponible 
app.set('views', path.join(__dirname, 'views')); // Indica ubicacion de vistas
// Configuracion de motor de plantillas
app.engine('.hbs', exphbs({
    defaultLayout: 'main', // La plantilla por defecto
    layoutsDir: path.join(app.get('views'), 'layouts'), // Indicar el directorio de plantillas
    partialsDir: path.join(app.get('views'), 'partials'), 
    extname: '.hbs' // Determina extencion de las plantillas
}));

app.set('view engine','.hbs');// Implementar motor de plantillas



// Midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));//Recibir los datos de los forms como objeto json
app.use(methodOverride('_method'));
app.use(session ({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());//es importante que sea despues de sesion
app.use(passport.session());
app.use(flash());

// VariablesGlobales
app.use((req, res, next) => {
    //Para los mensajes de flash
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null; //Guardar el uduario en una variable global 
    next();    
});
 
// Rutas
app.use(require('./routes/index.routes')); //Gestor de rutas 
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

// VariablesEstaticas
app.use(express.static(path.join(__dirname, 'public')));// Ubicacion de las variables estáticas



module.exports = app;