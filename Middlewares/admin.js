require('dotenv').config()

const admin = (request, response, next) => {
    const authUser = request.user;

    if (authUser.is_admin) {

        next();

    } else {
        response.sendStatus(401);
    }
};

module.exports = {
    admin,
}
