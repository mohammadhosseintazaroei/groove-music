const { body } = require('express-validator');
const { UserModel } = require('../../models/user');
function registerValidator() {
    return [
        body("username").notEmpty().isLength({ min: 4, max: 25 }).custom(async (value, ctx) => {
            if (value) {
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]/gi;
                if (usernameRegex.test(value)) {
                    const user = await UserModel.findOne({ username:value });
                    if (user) throw "نام کاربری تکراری میباشد"
                    return true
                }
                throw "نام کاربری صحیح نمیباشد"
            }
            throw "نام کابری نمیتواند خالی باشد"
        }),
        body("email").isEmail().withMessage("ایمیل وارد شده صحیح نمیباشد").custom(async email => {
            const user = await UserModel.findOne({ email });
            if (user) throw "ایمیل واردشده تکراری میباشد"
            return true;
        }),
        body("mobile").isMobilePhone("fa-IR").withMessage("شماره مبایل وارد شده صحیح نمیباشد").custom(async mobile => {
            const user = await UserModel.findOne({ mobile });
            if (user) throw "شماره موبایل وارد شده قبلا استفاده شده است"
            return true;
        }),
        body("password").isLength({ min: 6, max: 16 }).withMessage("رمز عبور حد اقل باید 6 کارکتر و حداکثر از 16 کرکتر تشکیل شده بشاد").custom((value, ctx) => {
            if (!value) throw "رمز عبور نمیتواند خالی باشد"
            if (value !== ctx?.req?.body?.confirm_password) throw "رمز عبور با تکرار آن یکسان نمیباشد"
            return true
        })
        
    ]
} ;

    function loginValidator() {
        return [
            body("username").notEmpty().withMessage("نام کاربری نمیتواند خالی باشد")
                .custom( username => {
                    const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
                    if (usernameRegex.test(username)) {
                        return true
                    }
                    throw "نام کاربری صحیح نمیبشاد"
                }),
            body("password").isLength({ min: 6, max: 16 }).withMessage("رمز عبور باید حد اقل 6 نویسه و حد اکثر 16 نویسه باشد")
        ]
    }
module.exports = {
    registerValidator, loginValidator
}