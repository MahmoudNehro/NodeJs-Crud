const User = require("../Models/User");
class UserController {
    async getAllUsers(request, response) {
        const authUser = request.user;
        if (!authUser.is_admin) {
            return response.sendStatus(401);
        }
        const users = await User.findAndCountAll();
        response.send({
            data: users.rows,
            message: `total users are ${users.count}`
        }).status(200);
    }
    async getUser(request, response) {
        const id = request.params.id;
        const authUser = request.user;
        if (authUser.id != id) {
            return response.sendStatus(401);
        }
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
        const authUser = request.user;
        if (!authUser.is_admin) {
            return response.sendStatus(401);
        }
        const user = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        };
        const data = {
            name: request.body.name,
            email: request.body.email,
        };
        await User.create(user).then(() => {
            response.send({
                data: data,
                message: 'user created successfully'
            }).status(201);
        });
    }
    async updateUser(request, response) {
        const id = request.params.id;
        const authUser = request.user;
        if (authUser.id != id) {
            return response.sendStatus(401);
        }
        const data = {
            name: request.body.name,
            email: request.body.email,
        };
        await User.findByPk(id).then((user) => {
            if (user != null) {
                user.update(data).then(() => {
                    response.send({
                        data: data,
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
        const authUser = request.user;
        if (!authUser.is_admin) {
            return response.sendStatus(401);
        }
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

