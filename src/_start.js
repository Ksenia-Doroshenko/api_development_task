import {expressjwt} from "express-jwt";
import jwt from 'jsonwebtoken';

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


export function validateToken(token, type) {
    try {
        if (type === 'access') {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        }
        if (type === 'refresh') {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        }
    } catch (e) {
        return null;
    }
}

export function generateTokens(payload) {
    const accessOptions = {};
    const refreshOptions = {};
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, accessOptions);
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, refreshOptions);
    return {
        accessToken,
        refreshToken
    };
}

export function validationMiddleware(schema) {
    return async function (req, res, next) {
        try {
            await schema.body.validate(req.body);
            return next();
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
}
