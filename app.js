const { MongoClient } = require('mongodb');
const net = require('net');

const uri = 'mongodb+srv://hola:~~~Buenavida8@cluster0.va8jp6n.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.argv[3] || 80;
const host = process.argv[2] || "t9j3b3fv-80.brs.devtunnels.ms";

const socket = new net.Socket();

socket.on('connect', async () => {
    console.log(`Conexión establecida con el servidor en el puerto ${port} de ${host}`);

    try {
        await client.connect();
        console.log('Conexión exitosa a MongoDB');

        const db = client.db('pruebas');
        const miColeccion = db.collection('contenidos');

        // Insertar datos (ejemplo)
        await miColeccion.insertOne({ mensaje: 'Datos recibidos del servidor' });

        // Obtener datos (ejemplo)
        const data = await miColeccion.findOne({ mensaje: 'Datos recibidos del servidor' });
        console.log('Datos obtenidos de la colección:', data);

        // Cerrar la conexión a la base de datos
        client.close();
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
    }
});

socket.on('error', function(err) {
    console.log("Error al conectar al servidor en " + host + " puerto " + port + ": " + err.message);
});

socket.connect(port, host);