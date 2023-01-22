const {AlbumController} = require('../http/controllers/album.controller');
const { createAlbumValidator } = require('../http/validations/album');
const { expressValidatorMapper } = require("../http/middlewares/checkErrrors")
const { checkLogin } = require('../http/middlewares/autoLogin');
const { uploadFile } = require('../modules/express--fileupload');
const fileupload = require('express-fileupload');
const { mongoIDValidator } = require('../http/validations/public');
const router = require('express').Router();

router.get("/", AlbumController.getAllAlbum)
router.post("/create",AlbumController.createAlbum)
// router.get("/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, SongController.getProjectById)
// router.delete("/remove/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, SongController.removeProject)
// router.put("/edit/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, SongController.updateProject)
// router.patch("/edit-project-image/:id", fileupload(),checkLogin,uploadFile, mongoIDValidator(), expressValidatorMapper, SongController.updateProjectImage)




module.exports = {
    albumRoutes: router
}