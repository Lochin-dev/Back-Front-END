const Joi = require("joi")

exports.userValidation = (data) => {

    const schema = Joi.object({
        user_name: Joi.string().min(3).max(15).required(),
        user_email: Joi.string().min(3).max(30).required().email(),
        user_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    })

    return schema.validate(data)
}


