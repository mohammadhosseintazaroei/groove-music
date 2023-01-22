const { UserModel } = require("../../models/user");
const { createLinkForFiles } = require("../../modules/functions");

class UserController {
    getProfile(req, res, next) {

        try {
            const user = req.user;
            user.profile_image =createLinkForFiles(user.profile_image,req)
            return res.status(200).json({
                status: 200,
                success: true,
                user
            })
        } catch (error) {
            next(user)
        }
    }
    async editProfile(req, res, next) {
        try {
            let data = { ...req.body };
            console.log(data);
            const userID = req.user._id;
            let fields = ["first_name", "last_name", "skills"];
            let basValues = ["", " ", ".", null, undefined, 0, -1, NaN, [], {}]
            Object.entries(data).forEach(([key, value]) => {
                if (!fields.includes(key)) delete data[key];
                if (basValues.includes(value)) delete data[key];
            })
            console.log(data);
            const result = await UserModel.updateOne({ _id: userID }, { $set: data })
            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "به روز رسانی  با موفقیت انحام شد"
                })
            }
            throw { status: 400, message: "به روز رسانی انجام نشد" }
        } catch (error) {
            error(next)
        }
    }
    async uploadProfileImage(req, res, next) {
        try {
            const userID = req.user._id;
            if (Object.keys(req.file).length == 0) throw { status: 400, message: "لطفا یک تصویر را انتخاب کنید" }
            const filePath = req.file?.path.replace("\\", "/").substring(7);
            const result = await UserModel.updateOne({ _id: userID }, {
                $set: { profile_image: filePath }
            })
            if (result.modifiedCount == 0) throw { status: 400, message: "به روز رسانی انجام نشد" }
            return res.status(200).json({
                status: 200,
                success: true,
                message: "به روز رسانی با موفقیت انجام شد "
            })
        } catch (error) {
            next(error)
        }
    }
    addSkiils() {

    }
    acceptInviteInTeam() {

    }
    rejectInviteInTeam() {

    }
}
module.exports = {
    UserController: new UserController()
}