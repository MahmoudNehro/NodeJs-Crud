require('dotenv').config()

const sameUser = (request, response, next) => {
    const authUser = request.user;
    if (authUser.id != request.params.id && !authUser.is_admin) {
        response.sendStatus(401);


    } else {
        next();

    }
};

module.exports = {
    sameUser,
}
