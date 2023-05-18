const Joi = require("joi")

exports.yearValidation = (data) => {

    const schema = Joi.object({
        year_num: Joi.number().min(0).max(15).required(),
        home_id: Joi.string().min(4).max(50).required()
    })
    return schema.validate(data)
}
