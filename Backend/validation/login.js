const Joi = require('joi');

function validateUser(body) {
    const schema = Joi.object({
        email: Joi.string()
            .required()
            .trim()
            .lowercase()
            .email()
            .max(320)
            .messages({
                "string.email": "Invalid email",
                "string.max": "Email cannot excede 320 characters"
            }),
        password: Joi.string()
            .min(8)
            .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$.!%*?&]{8,}$"))
            .required()
            .messages({
                "string.pattern.base": "Password must be at least 8 characters long and include at least one letter and one number",
                "string.min": "Password must be at least 8 characters long"
            })
    })

    return schema.validate(body)
}

exports.validate = validateUser;