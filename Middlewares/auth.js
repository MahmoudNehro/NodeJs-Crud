require('dotenv').config()
const jwt = require('jsonwebtoken');

const authenticateJWT = (request, response, next) => {
    let authHeader = request.headers.authorization;

    if (authHeader) {
        let token = request.headers['authorization'].split(" ")[1];

        jwt.verify(token, process.env.SECRET, (error, user) => {
            if (error) {
                return response.sendStatus(403);

            }
            request.user = user;
            next();
        });
    } else {
        response.sendStatus(401);
    }
};

module.exports = {
    authenticateJWT,
}
