const validator = require("validator");

// Método que valida si los campos de la película no están vacíos
const validateMovie = (params) => {
    let validar_titulo = !validator.isEmpty(params.title);
    let validar_contenido = !validator.isEmpty(params.content);

    if (!validar_titulo || !validar_contenido) {
        throw new Error("No se ha validado la información !!");
    }
}

module.exports = {
    validateMovie
}
