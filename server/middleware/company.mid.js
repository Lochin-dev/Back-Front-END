const { companyValidation } = require("../validation/company.val")


module.exports.companyValidate = function (req, res, next) {
    try {
        const { error } = companyValidation(req.body)
        if (error) {
            console.log(error);
            return res.status(400).json({ msg: error.details[0].message })
        }
        next()
    } catch (error) {
        console.log(error.message);
    }
}

