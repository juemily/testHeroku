/******************
 * PUERTO
 ****************/

process.env.PORT = process.env.PORT || 3000;


/******************
 * ENTORNO 
 ****************/

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/******************
 * BASE DE DATOS 
 ****************/

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/base-datos-prueba-mdb';

} else {
    urlDB = 'mongodb+srv://morrigan:v1JlnxCmjA9fjTHT@cluster0-xa8c8.mongodb.net/base-datos-prueba-mdb';

}

//urlDB = 'mongodb+srv://morrigan:v1JlnxCmjA9fjTHT@cluster0-xa8c8.mongodb.net/base-datos-prueba-mdb';

process.env.URLDB = urlDB;