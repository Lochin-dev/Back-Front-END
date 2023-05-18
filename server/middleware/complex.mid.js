const { complexValidation } = require("../validation/complex.val")


module.exports.complexValidate = function (req, res, next) {
    try {
        const { error } = complexValidation(req.body)
        if (error) {
            console.log(error);
            return res.status(400).json({ msg: error.details[0].message })
        }
        next()
    } catch (error) {
        console.log(error.message);
    }
}

