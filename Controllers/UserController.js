const User = require("../Models/User");
class UserController {
    async getAllUsers(requestuest, response) {
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
                response.send({
                    data: {},
                    message: 'user not found'
                }).status(404);
            }
        });
    }
    async createUser(request, response) {
        const user = {
            name: request.body.name,
            email: request.body.email
        };
        await User.create(user).then(() => {
            response.send({
                data: user,
                message: 'user created successfully'
            }).status(201);
        });
    }
    async updateUser(request, response) {
        const id = request.params.id;
        await User.findByPk(id).then((user) => {
            if (user != null) {
                user.update({
                    name: request.body.name,
                    email: request.body.email
                }).then(() => {
                    response.send({
                        data: user,
                        message: 'user updated successfully'
                    }).status(204);
                });
            } else {
                response.send({
                    data: {},
                    message: 'user not found'
                }).status(404);
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
                response.send({
                    data: {},
                    message: 'user not found'
                }).status(404);
            }
        });
    }
}

module.exports = new UserController();

