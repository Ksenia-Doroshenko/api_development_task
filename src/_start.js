import {expressjwt} from "express-jwt";

function extractJWTToken(req) {
    if (req.headers['x-auth-token']) {
        return req.headers['x-auth-token'];
    }
    return '';
}

function middlewareJWTTokenError(err, req, res, next) {
    if (err.name === 'UnauthorizedError' || !req.user) {
        return res.status(401).json({
            error: 'Требуется повторная авторизация',
        });
    }
    next();
}

const jwtMiddleware = expressjwt({
    secret: process.env.JWT_ACCESS_SECRET,
    algorithms: ['HS256'],
    getToken: extractJWTToken,
});
export const jwtAuthMiddleware = [jwtMiddleware, middlewareJWTTokenError];