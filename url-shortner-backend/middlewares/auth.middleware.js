import { validateUserToken } from '../utils/token.js';

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

export function authenticationMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return next();

  if (!authHeader.startsWith('Bearer')) {
    return status(400).json({
      error: 'Authorization header must start with Bearer',
    });
  }

  const [_, token] = authHeader.split(' ');

  const payload = validateUserToken(token);
  console.log('paylaod: ', payload);
  req.user = payload;
  next();
}
