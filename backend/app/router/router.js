const { albumRoutes } = require('./alums');
const { authRoutes } = require('./auth');
const { songRoutes } = require('./songs');


const router = require('express').Router();

router.use("/song" , songRoutes)
router.use("/album" , albumRoutes)
router.use("/auth" , authRoutes)



module.exports = {
    AllRoutes: router
}