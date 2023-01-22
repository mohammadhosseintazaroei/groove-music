const { body } = require("express-validator")
function createAlbumValidator() {
    return [
        body("title").notEmpty().withMessage("Music name cannot be empty"),
        body("artist").notEmpty().withMessage("Music artist cannot be empty"),
    ]
}

module.exports = {
    createAlbumValidator
}