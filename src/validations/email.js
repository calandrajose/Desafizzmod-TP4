const Joi = require('@hapi/joi')

const validateEmail = user =>{
    const productSchema = Joi.object({
        email:Joi.string().alphanum().email
    })

    const {error} = productSchema.validate(user)
    return error ? {valid: false, error} : {valid: true}
}

module.exports= {
    validateEmail
}