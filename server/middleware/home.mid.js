const { homeValidation } = require("../validation/home.val")


module.exports.homeValidate = function (req, res, next) {
    try {
        const { error } = homeValidation(req.body)
        if (error) {
            console.log(error);
            return res.status(400).json({ msg: error.details[0].message })
        }
        next()
    } catch (error) {
        console.log(error.message);
    }
}

