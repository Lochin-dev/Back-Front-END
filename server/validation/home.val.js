const Joi = require("joi")

exports.homeValidation = (data) => {

    const schema = Joi.object({
        home_num: Joi.string().min(1).max(20).required(),
        home_price: Joi.string().min(4).max(30).required(),
        home_kv: Joi.string().min(1).max(30).required(),
        complex_id: Joi.string().min(4).max(50).required()
    })

    return schema.validate(data)
}


