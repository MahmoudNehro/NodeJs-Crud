const User = require("../Models/User");
class UserController {
    async getAllUsers(req, res) {
        const users = await User.findAndCountAll();
        res.send({
            data: users.rows,
            total: users.count
        });
    }
    async getUser(req, res) {
        const id = req.params.id;
        await User.findByPk(id).then((user) => {
            if (user) {
                res.send({
                    data: user
                });
            } else {
                res.sendStatus(404);
            }
        });
    }
    async createUser(req, res) {
        console.log(req.body);
        const user = {
            name: req.body.name,
            email: req.body.email
        };
        await User.create(user).then(() => {
            res.sendStatus(201);
        });
    }
    async updateUser(req, res) {
        const id = req.params.id;
        await User.findByPk(id).then((user) => {
            console.log(user, req.body);
            if (user != null) {
                user.update({
                    name: req.body.name,
                    email: req.body.email
                }).then(() => {
                    res.sendStatus(204);
                });
            } else {
                res.sendStatus(404);
            }
        });
    }
    async deleteUser(req, res) {
        const id = req.params.id;
        await User.findByPk(id).then((user) => {
            if (user) {
                user.destroy();
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        });
    }
}

module.exports = new UserController();

