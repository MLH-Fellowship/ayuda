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

const topicValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        subject: Joi.string().required()
    })
    // Validate user received from request
    return schema.validate(data)
}

const subjectValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required()
    })
    // Validate user received from request
    return schema.validate(data)
}

const extendSessionValidation = (data) => {
    const schema = Joi.object({
        refreshToken: Joi.string().required()
    })
    // Validate user received from request
    return schema.validate(data)
}

const questionValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        text: Joi.string().required(),
        tags: Joi.array().items(Joi.string()),
        topic: Joi.string().required(),
        subject: Joi.string().required()
    })
    // Validate user received from request
    return schema.validate(data)
}

const answerValidation = (data) => {
    const schema = Joi.object({
        text: Joi.string().required(),
        question: Joi.string().required(),
        answerBeingRepliedTo: Joi.string()
    })
    // Validate user received from request
    return schema.validate(data)
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.topicValidation = topicValidation;
module.exports.subjectValidation = subjectValidation;
module.exports.extendSessionValidation = extendSessionValidation;
module.exports.questionValidation = questionValidation;
module.exports.answerValidation = answerValidation;