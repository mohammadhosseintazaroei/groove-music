const fileupload = require("express-fileupload")
const path = require("path");
const { createUploadPath } = require("./functions");
const uploadFile = async (req, res, next) => {
    try {
        if (req.file || Object.keys(req.files).length == 0) throw { status: 400, message: "تصویر شاخص پروژه را ارسال کنید" };
        let song = req.files.song;
        let type = path.extname(song.name);
        if (![".mp3"].includes(type)) throw { status: 400, message: "فرمت ارسال شده تصویر صحیح نمیباشد " }
        const song_path = path.join(createUploadPath() + Date.now() + type);
        req.body.song = song_path.substring(7);
        const uploadPath = path.join(__dirname, "..", "..", song_path)
        song.mv(uploadPath, (err) => {
            if (err) throw { status: 500, message: "بارگذاری تصویر انجام نشد" }
            next()
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    uploadFile
}