const { body, validationResult } = require('express-validator')
const User = require('../Models/User')
const userValidator = () => {
    return [
        body('name')
            .not().isEmpty().trim().escape().withMessage('Name is required')
            .isAlpha().withMessage('Name must be only letters')
            .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
            .isLength({ max: 20 }).withMessage('Name must be at most 20 characters long'),
        body('email').isEmail().normalizeEmail().withMessage('Email is not valid').custom(async value => {
            const user = await User.findOne({ where: { email: value } });
            if (user) {
                return Promise.reject('E-mail already in use');
            }

        }),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').isStrongPassword().withMessage('Password must be strong'),

    ]
}

const validate = (request, response, next) => {
    const errors = validationResult(request);
    if (errors.isEmpty()) {
        return next();
    }
    const errorMessages = [];

    errors.array().map(error => errorMessages.push({ [error.param]: error.msg }))
    return response.status(422).json({
        errors: errorMessages,
    })
}

module.exports = {
    userValidator,
    validate,
}
