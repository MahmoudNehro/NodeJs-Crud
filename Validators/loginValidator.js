const { body, validationResult } = require('express-validator')
const loginValidator = () => {
    return [

        body('email').isEmail().normalizeEmail().notEmpty().withMessage('Email is required'),
        body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 })

    ]
}

const validateLogin = (request, response, next) => {
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
    loginValidator,
    validateLogin,
}
