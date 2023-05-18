const Joi = require("joi")

exports.companyValidation = (data) => {
    const schema = Joi.object({
        company_title: Joi.string().min(3).max(20).required(),
        company_img: Joi.string().min(10).max(800).required(),
    })

    return schema.validate(data)
}


