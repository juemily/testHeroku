require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/usuario');


const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//routes
app.use('/', routes.app);

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const conect = mongoose.connection;
conect.on('error', console.error.bind(console, 'error de conexion:'));
conect.once('open', () => { console.log('Conexion a Base de datos iniciada') });

app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`)
});

module.exports = { app };