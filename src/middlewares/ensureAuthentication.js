const { verify } = require("jsonwebtoken");
const { jwt } = require("../config/auth");
const appError = require("../utils/appError");


async function ensureAuthentication(req, res, next) {
    
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new appError("JWT token não informado", 401);
    };

    const [, token] = authHeader.split(" ");

    try {

        const { sub: user_id } = verify(token, jwt.secret);

        req.user = {
            id: Number(user_id),
        };

        return next();

    } catch {
        throw new appError(401, "token inválido");
    }
};

module.exports = ensureAuthentication;