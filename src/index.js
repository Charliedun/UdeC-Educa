require('dotenv').config();// Asimila variables de entorno en archivo .env

const app = require('./server');
require('./database');

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})