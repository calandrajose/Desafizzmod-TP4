const Joi = require('@hapi/joi')

const validateProducts = user =>{
    const productSchema = Joi.object({
        name:Joi.string().alphanum().required(),
        price:Joi.number().required(),
        description:Joi.string().alphanum().required(),
        url:Joi.string().alphanum().required(),
    })

    const {error} = productSchema.validate(user)
    return error ? {valid: false, error} : {valid: true}
}

module.exports = {
    validateProducts
}