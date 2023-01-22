const { body } = require("express-validator")
function createSongValidator() {
    return [
        body("title").notEmpty().withMessage("Music name cannot be empty"),
        body("artist").notEmpty().withMessage("Music artist cannot be empty"),
        body("genre").notEmpty().withMessage("Music genere cannot be empty"),
    ]
}

module.exports = {
    createSongValidator
}