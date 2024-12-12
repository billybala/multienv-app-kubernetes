const redis = require('redis');

// Configuración de Redis
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:6379`
});

redisClient.on('error', (err) => {
  console.error('Error al conectar a Redis:', err);
});

redisClient.on('connect', () => {
  console.log('Conectado a Redis...');
});

// Función para conectar Redis
async function connectRedis() {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log('Redis conectado');
    }
  } catch (err) {
    console.error('Error al intentar conectar a Redis:', err);
  }
}

// Función para desconectar Redis
async function disconnectRedis() {
  try {
    if (redisClient.isOpen) {
      await redisClient.quit();
      console.log('Redis desconectado');
    }
  } catch (err) {
    console.error('Error al intentar desconectar Redis:', err);
  }
}

module.exports = { redisClient, connectRedis, disconnectRedis };
