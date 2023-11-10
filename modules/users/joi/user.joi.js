const Joi = require("joi")
module.exports = {
    registerSchema: {
        body: Joi.object().keys({
            userName: Joi.string().alphanum().min(3).max(15).required(),
            email: Joi.string().email().required(),
            password: Joi.string()
                .pattern(
                    new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$")
                )
                .required()
                .messages({
                    'string.pattern.base': 'Minimum eight characters, at least one letter, one number, and one special character.',
                }),
            cPassword: Joi.string()
                .valid(Joi.ref("password"))
                .required()
                .messages({
                    'any.only': 'Passwords do not match.'
                }),
            phone: Joi.string().pattern(new RegExp("^01[0125][0-9]{8}$")).required(),
            address: Joi.string().required(),
            gender: Joi.string().valid("male", "female").required(),
            age: Joi.number().integer().min(18).required(),
        })
    },
    loginSchema: {
        body: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string()
                .pattern(
                    new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$")
                )
                .required()
                .messages({
                    'string.pattern.base': 'Minimum eight characters, at least one letter, one number, and one special character.',
                }),
        })
    },
    resetPasswordSchema: {
        body: Joi.object().keys({
            currentPassword: Joi.string().required(),
            password: Joi.string()
            .pattern(
              new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$")
            )
            .required()
            .messages({
              'string.pattern.base': 'Minimum eight characters, at least one letter, one number, and one special character.',
            }),
        })
    },
    addIdSchema: {
        body: Joi.object().keys({
            id: Joi.string().required()
        })
    },
    addNewAdminAndRemoveAdmin: {
        body: Joi.object().keys({
            email: Joi.string().email().required()
        })
    }
}