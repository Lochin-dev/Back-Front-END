const { yearValidation } = require("../validation/year.val")


module.exports.yearValidate = function (req, res, next) {
    try {
        const { error } = yearValidation(req.body)
        if (error) {
            console.log(error);
            return res.status(400).json({ msg: error.details[0].message })
        }
        next()
    } catch (error) {
        console.log(error.message);
    }
}
