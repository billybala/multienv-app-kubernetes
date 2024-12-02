# Usamos la imagen oficial de Node.js
FROM node:18-alpine

# Crear directorio de la aplicación
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Especifica el puerto en el que se ejecuta el backend
EXPOSE 8000

# Comando para ejecutar el servidor Node.js
CMD ["npm", "start"]
