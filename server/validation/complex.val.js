const Joi = require("joi")

exports.complexValidation = (data) => {

    const schema = Joi.object({
        complex_title: Joi.string().min(3).max(20).required(),
        complex_adres: Joi.string().min(3).max(20).required(),
        company_id: Joi.string().required()
    })

    return schema.validate(data)
}




