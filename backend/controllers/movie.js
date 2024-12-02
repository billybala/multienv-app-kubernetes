const { validateMovie } = require("../helpers/validate");
const Movie = require("../models/Movie.js");
const path = require("path");
const fs = require("fs");

// Método para crear una película
const create = (req, res) => {
    // Recoger parámetros por post a guardar en la base de datos
    let params = req.body;    

    // Validar datos
    try {
        validateMovie(params);
    }
    catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        })
    }

    // Crear objeto a guardar
    const movie = new Movie(params);

    // Guardar la película en la base de datos
    movie.save().then((savedMovie) => {
        if (!savedMovie) {
            return res.status(400).json({
                status: "error",
                message: "No se ha guardado el artículo"
            });
        }

        // Devolver resultado
        return res.status(200).json({
            message: "Success",
            movie: savedMovie,
            message: "Película creada con éxito !!!"
        });
    })
    .catch((error) => {
        return res.status(500).json({
            status: "error",
            message: "Ha ocurrido un error"
        });
    });
};

// Método para obtener todas las películas
const getAll = (req, res) => {
    // Obtención de todas las películas de la base de datos
    let consulta = Movie.find({});

    // Ordenar las películas por fecha de creación
    consulta.sort({date: -1}).exec().then((movies) => {
        if (!movies) {
            return res.status(404).json({
                status: "error",
                message: "No se han encontrado películas !!"
            });
        };

        return res.status(200).send({
            status: "Success",
            numMovies: movies.length,
            movies
        })
    })
    .catch((error) => {
        return res.status(500).json({
            status: "error",
            message: "Ha ocurrido un error"
        });
    });
};

// Método para eliminar una película
const deleteOne = (req, res) => {
    // Obtención del id de la película a eliminar
    let movie_id = req.params.id;

    // Búsqueda de la película a eliminar y posterior eliminación
    Movie.findOneAndDelete({_id: movie_id}).then((deletedMovie) => {
        if (!deletedMovie) {
            return res.status(500).json({
                status: "error",
                message: "Error al borrar el artículo"
            });
        }

        return res.status(200).json({
            status: "Success",
            movie: deletedMovie,
            message: "Delete method"
        });
    })
    .catch((error) => {
        return res.status(500).json({
            status: "error",
            message: "Ha ocurrido un error"
        });
    });
};

const saveDocument = async (req, res) => {
    try {
        // Obtención de los datos a enviar por post
        const { instanceId } = req.body;
        const timestamp = new Date().toISOString();
        const movies = await Movie.find({});
            
        // Generación del contenido del documento
        const content = JSON.stringify({
            instance: instanceId,
            timestamp,
            movies
        }, null, 2);
        
        const filePath = path.join('/app/static', 'db_snapshot.json');
        
        // Escritura del contenido del documento en el archivo
        await fs.promises.writeFile(filePath, content);
        
        return res.status(200).json({
            status: "Success",
            message: "Documento guardado con éxito",
            filePath
        });
    } catch(error) {
        return res.status(500).json({
            status: "error",
            message: "Ha ocurrido al guardar el documento",
            error
        });
    };
};

const downloadDocument = (req, res) => {
    const filePath = path.join('/app/static', 'db_snapshot.json');

    // Verifica si el archivo existe
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({
                status: "error",
                message: "El documento no existe"
            });
        }

        // Envía el archivo al cliente para descarga
        res.download(filePath, 'db_snapshot.json', (err) => {
            if (err) {
                return res.status(500).json({
                    status: "error",
                    message: "Error al descargar el documento"
                });
            }
        });
    });
};

const checkDocumentExists = (req, res) => {
    const filePath = path.join('/app/static', 'db_snapshot.json'); // Ruta del archivo en el almacenamiento compartido

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // El archivo no existe
            return res.json({ exists: false });
        } else {
            // El archivo existe
            return res.json({ exists: true });
        }
    });
};

module.exports = {
    create,
    getAll,
    deleteOne,
    saveDocument,
    downloadDocument,
    checkDocumentExists,
};
