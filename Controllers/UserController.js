const User = require("../Models/User");
const bcrypt = require('bcrypt');

class UserController {
    async getAllUsers(request, response) {
        const users = await User.findAndCountAll();
        response.send({
            data: users.rows,
            message: `total users are ${users.count}`
        }).status(200);
    }
    async getUser(request, response) {
        const id = request.params.id;
        await User.findByPk(id).then((user) => {
            if (user) {
                response.send({
                    data: user,
                    message: 'user found successfully'
                }).status(200);
            } else {
                response.status(404).send({
                    data: {},
                    message: 'user not found'
                });
            }
        });
    }
    async createUser(request, response) {
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
            response.status(201).send({
                data: data,
                message: 'user created successfully'
            });
        });
    }
    async updateUser(request, response) {
        const id = request.params.id;
        const data = {
            name: request.body.name,
            email: request.body.email,
        };
        await User.findByPk(id).then((user) => {
            if (user != null) {
                user.update(data).then(() => {
                    response.status(204).send({
                        data: data,
                        message: 'user updated successfully'
                    });
                });
            } else {
                response.status(404).send({
                    data: {},
                    message: 'user not found'
                });
            }
        });
    }
    async deleteUser(request, response) {
        const id = request.params.id;
        await User.findByPk(id).then((user) => {
            if (user) {
                user.destroy();
                response.send({
                    data: {},
                    message: 'user deleted successfully'
                }).status(204);
            } else {
                response.status(404).send({
                    data: {},
                    message: 'user not found'
                });
            }
        });
    }
}

module.exports = new UserController();

