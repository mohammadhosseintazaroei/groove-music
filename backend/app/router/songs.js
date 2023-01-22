const { SongController } = require('../http/controllers/songs');
const { createSongValidator } = require('../http/validations/project');
const { expressValidatorMapper } = require("../http/middlewares/checkErrrors")
const { checkLogin } = require('../http/middlewares/autoLogin');
const { uploadFile } = require('../modules/express--fileupload');
const fileupload = require('express-fileupload');
const { mongoIDValidator } = require('../http/validations/public');
const router = require('express').Router();

router.get("/", SongController.getAllSong)
router.post("/create",fileupload(), uploadFile, createSongValidator() ,expressValidatorMapper,SongController.createSong)
router.get("/:album", SongController.getAlbumSongs)

// router.get("/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, SongController.getProjectById)
// router.delete("/remove/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, SongController.removeProject)
// router.put("/edit/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, SongController.updateProject)
// router.patch("/edit-project-image/:id", fileupload(),checkLogin,uploadFile, mongoIDValidator(), expressValidatorMapper, SongController.updateProjectImage)




module.exports = {
    songRoutes: router
}