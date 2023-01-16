const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class AuthController {

    async register(request, response, next) {
        const salt = await bcrypt.genSalt(10);
        const passwordToString = request.body.password.toString();
        const user = {
            name: request.body.name,
            email: request.body.email,
            password: await bcrypt.hash(passwordToString, salt)
        };
        const data = {
            name: request.body.name,
            email: request.body.email,
        };
        await User.create(user).then(() => {
            response.send({
                data: data,
                message: 'user registered successfully'
            }).status(201);
        });
    }
    async login(request, response, next) {
        const user = await User.scope('withPassword').findOne({ where: { email: request.body.email } });
        if (user) {
            const passwordToString = request.body.password.toString();
            bcrypt.compare(passwordToString, user.password, function (err, result) {
                if (result) {
                    let token = jwt.sign({ "id": user.id, "email": user.email, "is_admin": user.is_admin }, process.env.SECRET, { expiresIn: "1h" });
                    response.send({
                        data: { access_token: token },
                        message: 'user created successfully'
                    }).status(200);
                } else {
                    response.send({
                        data: { access_token: null },
                        message: 'couldn"t authenticate'
                    }).status(400);
                }

            });


        } else {
            response.send({
                data: { access_token: null },
                message: 'user does not exist'
            }).status(400);
        }

    }
}

module.exports = new AuthController();
