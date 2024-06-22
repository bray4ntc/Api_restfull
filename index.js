import express from 'express';
import mysql from 'mysql'; // Importar la biblioteca MySQL

const app = express();  // Crear una instancia de la aplicación Express

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Definir una ruta raíz para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('API funcionando');
});

// Definir una ruta para obtener datos desde la base de datos
app.get('/data', (req, res) => {
    db.query('SELECT * FROM test_table', (err, results) => {
        if (err) {
            console.error('Error al realizar la consulta:', err);
            res.status(500).send('Error en la consulta a la base de datos');
            return;
        }
        res.json(results);  // Devolver los resultados en formato JSON
    });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
