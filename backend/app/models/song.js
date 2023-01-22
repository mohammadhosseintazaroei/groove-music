const mongoose = require("mongoose")

const SongsSchema = new mongoose.Schema({
    trackSrc: { type: String },
    thumbnail: { type: String },
    artist: { type: String, required: true },
    title: { type: String, required: true },
    album: { type: String },
    genre: { type: String, required: true },
    year: { type: Number },
    time: { type: String }

}, {
    timestamps: true
});
const SongsModel = mongoose.model("songs", SongsSchema);
module.exports = {
    SongsModel
};
