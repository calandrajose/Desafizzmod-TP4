const Joi = require('@hapi/joi')

const validateEmail = user =>{
    const emailSchema = Joi.object({
        email:Joi.string().alphanum().email().required()
    })

    const {error} = emailSchema.validate(user)
    
    return error ? {valid: false, error} : {valid: true}
}

module.exports= {
    validateEmail
}