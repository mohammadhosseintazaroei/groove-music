const mongoose = require("mongoose")

const AlbumsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    thumbnail: { type: String, default: "../assets/img/album-img/sheytan.jpg" }

}, {
    timestamps: true
});
const AlbumsModel = mongoose.model("albums", AlbumsSchema);
module.exports = {
    AlbumsModel
};
