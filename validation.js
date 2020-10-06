// Validation
const Joi = require("@hapi/joi");

// Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        country: Joi.string().required(),
        school: Joi.string().required(),
        field: Joi.string().required(),
        password: Joi.string().required(),
    })


    // Validate user received from request
    return schema.validate(data)

}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    })


    // Validate user received from request
    return schema.validate(data)

}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;