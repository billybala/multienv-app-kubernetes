const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Movie = require("./models/Movie.js");

// Crear servidor node
const app = express();
const PORT = process.env.PORT || 8000;

// Conectar a la base de datos antes de arrancar el servidor
const connectDB = require('./database/connect.js');
connectDB();
let dbConnection = true;

// Configurar cors
app.use(cors());

// Conexión a Redis (solo en producción)
let redisConnection = false;
const { redisClient, connectRedis, disconnectRedis } = require('./cache/cache.js');
if (process.env.NODE_ENV === 'production') {
  connectRedis().catch(console.error);
  redisConnection = true;
}

// Convertir los datos del body a objetos json
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Endpoint para verificar el estado de la conexión a la base de datos
app.get('/api/dbstatus', (req, res) => {
  const mongoStatus = dbConnection ? 'Conectado' : 'Desconectado';
  res.json({ mongoStatus });
});

// Endpoint para conectar a la base de datos
app.post('/api/dbconnect', async (req, res) => {
  if (!dbConnection) {
    try {
      connectDB();
      dbConnection = true;
      res.json({ mongoStatus: 'Conectado' });
    } catch (error) {
      res.status(500).json({ mongoStatus: 'Error', error: error.message });
    }
  } else {
    res.json({ mongoStatus: 'Ya Conectado' });
  }
});

// Endpoint para desconectar de la base de datos
app.post('/api/dbdisconnect', async (req, res) => {
  if (dbConnection) {
    try {
      await mongoose.disconnect();
      dbConnection = false;
      res.json({ mongoStatus: 'Desconectado' });
    } catch (error) {
      res.status(500).json({ mongoStatus: 'Error', error: error.message });
    }
  } else {
    res.json({ mongoStatus: 'Ya Desconectado' });
  }
});

// Endpoint para obtener el estado de la caché
app.get('/api/redis-status', (req, res) => {
  if (redisClient && redisConnection) {
    res.json({ redisStatus: 'Conectado' });
  } else {
    res.json({ redisStatus: 'Desconectado' });
  }
});

// Endpoint para conectar Redis
app.post('/api/connect-redis', async (req, res) => {
  if (!redisClient.isOpen) {
    try {
      await connectRedis();
      redisConnection = true;
      res.json({ redisStatus: 'Conectado' });
    } catch (error) {
      console.error('Error al conectar a Redis:', error);
      res.status(500).json({ error: 'Error al conectar a Redis' });
    }
  } else {
    res.json({ redisStatus: 'Ya Conectado' });
  }
});

// Endpoint para desconectar Redis
app.post('/api/disconnect-redis', async (req, res) => {
  if (redisClient.isOpen) {
    try {
      await disconnectRedis();
      redisConnection = false;
      res.json({ redisStatus: 'Desconectado' });
    } catch (error) {
      console.error('Error al desconectar Redis:', error);
      res.status(500).json({ error: 'Error al desconectar Redis' });
    }
  } else {
    res.json({ redisStatus: 'Ya Desconectado' });
  }
});

// Endpoint para obtener todas las películas y almacenarlas en la caché
app.get('/api/cache-movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    await redisClient.set('movies', JSON.stringify(movies)); // Guardar en caché
    res.json({ status: 'Success', isEmpty: movies.length === 0 });
  } catch (error) {
    console.error('Error al obtener películas:', error);
    res.status(500).json({ error: 'Error al obtener películas' });
  }
});

// Endpoint para obtener películas desde la caché
app.get('/api/get-movies-from-cache', async (req, res) => {
  try {
    const cachedMovies = await redisClient.get('movies'); // Obtener desde la caché
    if (cachedMovies) {
      res.json({ status: 'Success' , movies: JSON.parse(cachedMovies) }); // Devuelve las películas desde la caché
    } else {
      res.status(404).json({ message: 'No hay películas en caché' });
    }
  } catch (error) {
    console.error('Error al obtener películas de la caché:', error);
    res.status(500).json({ error: 'Error al obtener películas de la caché' });
  }
});

// Endpoint para vaciar la caché
app.delete('/api/clear-cache', async (req, res) => {
  try {
    await redisClient.flushAll(); // Elimina todas las claves de la caché
    res.json({ status: 'Empty' });
  } catch (error) {
    console.error('Error al vaciar la caché:', error);
    res.status(500).json({ error: 'Error al vaciar la caché' });
  }
});

// Endpoint para obtener el entorno
app.get('/api/environment', (req, res) => {
  const environment = process.env.NODE_ENV;
  res.json({ environment });
});

// RUTAS ADICIONALES
const routes = require("./routes/movies.js");

// Cargar las rutas
app.use("/api", routes);

// Crear servidor y escuchar peticiones http
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
