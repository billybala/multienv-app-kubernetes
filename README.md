# Aplicación Multi-Entorno

## 1. Guía para hacer el setup del proyecto

### Requisitos previos

Antes de empezar, asegúrate de tener Node.js instalado para poder instalar las dependencias y ejecutar el proyecto.

Puedes descargar Node.js desde el sitio oficial: https://nodejs.org/es/

En caso de querer ver visualmente las bases de datos, puedes utilizar [MongoDB Compass](https://www.mongodb.com/try/download/compass) y conectarte poniendo `mongodb://0.0.0.0:27017` como URI. Una vez conectado, cuando levantes la aplicación, deberías ver la base de datos correspondiente.

### Instalación

1. Descarga el proyecto comprimido o clona el repositorio. Puedes descargarlo o clonarlo desde GitHub (https://github.com/billybala/multi-env-app). Si prefieres clonar el repositorio, asegúrate de que estés en la carpeta donde quieres clonar el proyecto y ejecuta `git clone https://github.com/billybala/multi-env-app.git`.

2. Una vez descargado o clonado el proyecto, abre una terminal en la carpeta del proyecto, sitúate en la carpeta backend (`cd backend`) y ejecuta `npm install` para instalar las dependencias del backend. Haz lo mismo para la carpeta frontend (`cd frontend`) y ejecuta `npm install`.

## 2. Partes del proyecto

### 2.1 Backend

El backend se encarga de manejar la conexión a la base de datos y la caché, así como de gestionar las operaciones de la aplicación. El backend está dividido en dos partes principales:

- **Server.js**: Este archivo es el punto de entrada principal del backend. Contiene la configuración de la aplicación, la conexión a la base de datos y la caché, y la configuración del servidor. También contiene las rutas de las diferentes APIs que se utilizarán en el frontend.

- **Database**: Esta carpeta contiene los archivos necesarios para conectarse a la base de datos. Contiene un archivo llamado `connect.js` que contiene la función para conectarse a la base de datos.

- **Cache**: Esta carpeta contiene los archivos necesarios para conectarse a la caché. Contiene un archivo llamado `cache.js` que contiene la función para conectarse a la caché.

- **Models**: Esta carpeta contiene los archivos necesarios para definir los modelos de la base de datos. Contiene un archivo llamado `Movie.js` que contiene la definición de los modelos de la base de datos.

- **Routes**: Esta carpeta contiene los archivos necesarios para definir las rutas de las diferentes APIs. Contiene un archivo llamado `movies.js` que contiene la definición de las rutas de las APIs.

- **Controllers**: Esta carpeta contiene los archivos necesarios para definir las funciones de las diferentes APIs. Contiene un archivo llamado `movies.js` que contiene la definición de las funciones de las APIs.

- **Dockerfile**: Este archivo es el archivo de configuración de la imagen personalizada de la aplicación. Contiene las instrucciones necesarias para construir la imagen del backend.

### 2.2 Frontend

El frontend se encarga de mostrar la interfaz de usuario de la aplicación y de interactuar con el backend. El frontend está dividido en dos partes principales:

- **App.js**: Este archivo es el punto de entrada principal del frontend.

- **Components**: Esta carpeta contiene los archivos necesarios para definir los componentes de la aplicación.

- **Context**: Esta carpeta contiene el archivo necesario para definir las variables globales y las funciones de estado del frontend.

- **Helpers**: Esta carpeta contiene los archivos necesarios para definir las funciones de utilidad del frontend.

- **Dockerfile**: Este archivo es el archivo de configuración de la imagen personalizada de la aplicación. Contiene las instrucciones necesarias para construir la imagen del frontend.

## 4. Tests utilizados y sus output

- **Test de conexión a la base de datos**: La aplicación se conecta a la base de datos automáticamente y muestra el estado de la conexión en la sección de conexión a la base de datos. Con los botones de conectar y desconectar, se visualiza como cambia el estado de la conexión a la base de datos.

- **Test de conexión a la caché**: La aplicación se conecta a la caché automáticamente y muestra el estado de la conexión en la sección de conexión a la caché. Con los botones de conectar y desconectar, se visualiza como cambia el estado de la conexión a la caché.

- **Test de añadir una película a la base de datos**: Se muestra el modal de añadir una película después de pulsar el botón "Añadir película". Se muestra la película en la lista de películas de la base de datos después de añadirla.

- **Test de mostrar todas las películas de la base de datos**: Se muestra la lista de películas de la base de datos después de pulsar el botón "Mostrar películas de la BD".

- **Test de guardar películas en caché**: Al pulsar el botón "Guardar películas en caché", se guardan las películas de la base de datos en caché.

- **Test de mostrar películas en caché**: Al pulsar el botón "Mostrar películas en caché", se muestran las películas guardadas en caché.

- **Test de vaciar caché**: Al pulsar el botón "Vaciar caché", se vacían las películas guardadas en caché.

- **Test de almacenar un fichero de logs en un almacenamiento compartido**: Se crea un fichero de información que contiene la instancia de la aplicación desde la que se crea el fichero, un timestamp y el contenido de la base de datos y se guarda en el almacenamiento compartido.

- **Test de descargar el último fichero de logs almacenado en el almacenamiento compartido**: Se descarga el último fichero de logs almacenado en el almacenamiento compartido emn formato JSON.
