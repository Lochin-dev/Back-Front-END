const { bankValidation } = require("../validation/bank.val")


module.exports.bankValidate = function (req, res, next) {
    try {
        const { error } = bankValidation(req.body)
        if (error) {
            console.log(error);
            return res.status(400).json({ msg: error.details[0].message })
        }
        next()
    } catch (error) {
        console.log(error.message);
    }
}

