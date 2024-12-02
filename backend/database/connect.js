const mongoose = require('mongoose');

const connectDB = async (retries = 5, delay = 5000) => {
  // Se usa la variable de entorno MONGO_URI que viene del respectivo fichero .env
  const mongoURI = process.env.MONGO_URI;
  while (retries > 0) {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Conectado a MongoDB...');
      break;
    } catch (error) {
      console.error(`Error al conectar a MongoDB: ${error.message}`);
      retries -= 1;
      console.log(`Reintentando en ${delay / 1000} segundos...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  
  if (retries === 0) {
    console.error('No se pudo conectar a MongoDB después de varios intentos');
    process.exit(1);
  }
};

module.exports = connectDB;