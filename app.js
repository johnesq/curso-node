const net = require('net');
const { MongoClient } = require('mongodb');

const port = process.argv[3] || 80;
const host = process.argv[2] || "t9j3b3fv-80.brs.devtunnels.ms";

const uri = 'mongodb+srv://hola:~~~Buenavida8@cluster0.va8jp6n.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
    }
}

const socket = new net.Socket();

socket.on('connect', function() {
    console.log("Conexión establecida con el servidor en el puerto " + port + " de " + host);
});

socket.on('data', async function(data) {
    const receivedData = data.toString(); // Corrección: asigna los datos recibidos a una variable
    console.log("Datos recibidos del servidor:", receivedData);

    // Insertar los datos en la colección 'contenidos'
    const db = client.db('pruebas');
    const miColeccion = db.collection('contenidos');
    await miColeccion.insertOne({ datos: receivedData });
});

socket.on('error', function(err) {
    console.log("Error al conectar al servidor en " + host + " puerto " + port + ": " + err.message);
});

socket.connect(port, host);
