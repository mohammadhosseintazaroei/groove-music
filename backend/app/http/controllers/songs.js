const autoBind = require("auto-bind")
const { SongsModel } = require("../../models/song");
const { createLinkForFiles } = require("../../modules/functions");

class SongController {
    constructor() {
        autoBind(this)
    }
    async createSong(req, res, next) {
        try {
            const { title, artist, album, genre, year, time, song } = req.body;
            console.log(song);
            // const owner = req.user._id;
            const result = await SongsModel.create({ title, artist, album, genre, year, time, trackSrc: song });
            if (!result) throw { status: 400, message: "There is something wrong adding a Song" };
            return res.status(201).json({
                status: 201,
                success: true,
                message: "Song added successfully"
            })

        } catch (error) {
            next(error)
        }
    }
    async getAllSong(req, res, next) {
        try {

            const songs = await SongsModel.find({});
            for (const song of songs) {
                song.trackSrc = createLinkForFiles(song.trackSrc, req)

            }
            return res.status(200).json({
                status: 200,
                success: true,
                result: songs
            })
        } catch (error) {
            next(error)
        }
    }
    async getAlbumSongs(req, res, next) {
        try {
            const { album } = req.params;
            const songs = await SongsModel.find({ album });
            for (const song of songs) {
                song.trackSrc = createLinkForFiles(song.trackSrc, req)

            }
            if (!songs) throw { status: 404, message: "پزوژه ای یافت نشد" };
            console.log(songs);
            res.status(200).send({
                status: 200,
                success: true,
                songs
            })
            return project
        } catch (error) {
            next(error)
        }
    }
    async findProject(projectID, owner) {
        const project = await ProjectModel.findOne({ owner, _id: projectID });
        if (!project) throw { status: 404, message: "پزوژه ای یافت نشد" };
        return project
    }
    async getProjectById(req, res, next) {
        try {
            const owner = req.user._id;
            const projectID = req.params.id;
            const project = await this.findProject(projectID, owner)
            project.image = createLinkForFiles(project.image, req)
            return res.status(200).json({
                status: 200,
                success: true,
                project
            })


        } catch (error) {
            console.log(error);
            next(error)
        }

    }
    async removeProject(req, res, next) {
        try {
            const owner = req.user._id;
            const projectID = req.params.id;
            await this.findProject(projectID, owner)
            const deleteProjectResult = await ProjectModel.deleteOne({ _id: projectID });
            if (deleteProjectResult.deletedCount == 0) throw { status: 400, message: "پروژه حذف نشد" };
            return res.status(200).json({
                status: 200,
                success: true,
                message: "پروژه با موفقیت حذف شد"
            })

        } catch (error) {
            next(error)
        }
    }
    async updateProject(req, res, next) {
        try {
            const owner = req.user._id;
            const projectID = req.params.id;
            const project = await this.findProject(projectID, owner);
            const data = { ...req.body };
            Object.entries(data).forEach(([key, value]) => {
                if (!["title", "text", "tags"].includes(key)) delete data[key];
                if (["", " ", 0, null, undefined, NaN].includes(value)) delete data[key];
                if (key == "tags" && (data['tags'].constructor == Array)) {
                    data['tags'] = data['tags'].filter(val => {
                        if (!["", " ", 0, null, undefined, NaN].includes(val)) return val;
                    })
                    if (data['tags'].length == 0) delete data['tags']
                }
            })
            const updateResult = await ProjectModel.updateOne({ _id: projectID }, { $set: data });
            if (updateResult.modifiedCount == 0) throw { status: 400, message: "به روز رسانی انجام نشد" };
            return res.status(200).json({
                status: 200,
                success: true,
                message: "به ورز رسانی با موفقیت انجام شد"
            });
        } catch (error) {
            next(error)
        }
    }
    async updateProjectImage(req, res, next) {
        try {
            const { image } = req.body;
            const owner = req.user._id;
            const projectID = req.params.id;
            await this.findProject(projectID, owner);
            const updateResult = await ProjectModel.updateOne({ _id: projectID }, { $set: { image } });
            if (updateResult.modifiedCount == 0) throw { status: 400, message: "به روز رسانی انجام نشد" };
            return res.status(200).json({
                status: 200,
                success: true,
                message: "به روز رسانی با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }
    getProjectOfUser() {

    }

    getProjectOfTeam() {

    }
}

module.exports = {
    SongController: new SongController()
}