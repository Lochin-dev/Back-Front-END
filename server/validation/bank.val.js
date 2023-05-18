const Joi = require("joi")

exports.bankValidation = (data) => {

    const schema = Joi.object({
        bank_title: Joi.string().min(1).max(20).required(),
        bank_price: Joi.number().required(),
        company_id: Joi.string().min(4).max(50).required()
    })
    return schema.validate(data)
}
