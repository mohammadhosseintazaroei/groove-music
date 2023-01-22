const { body } = require("express-validator")
const { TeamModel } = require("../../models/team")
function createTeamValidator() {
    return [
        body("name").isLength({ min: 5 }).withMessage("نام تیم نمیتواند کمتر از پنج نویسه باشد"),
        body("description").notEmpty().withMessage("توضیحات نمیتواند خالی باشد"),
        body("username").custom(async (username) => {
            const usernameRegex = /^[a-z]+[a-z0-9\_\.]{3,}$/gim
            if (usernameRegex.test(username)) {
                const team = await TeamModel.findOne({ username });
                if (team) throw "نام کاربری توسط تیم دیگری استفاده شده است";
                return true
            }

            throw "نام کاربری را به طور صحیح وارد کنید"
        })
    ]
}

module.exports ={
    createTeamValidator
}