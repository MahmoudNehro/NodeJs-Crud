require('dotenv').config()

const deleteApility = (request, response, next) => {
    const authUser = request.user;
    if (authUser.id == request.params.id) {
        response.sendStatus(403);


    } else {
        next();

    }
};

module.exports = {
    deleteApility,
}
