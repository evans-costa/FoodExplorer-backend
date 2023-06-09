import authConfig from "../configs/auth.js";
import { AppError } from "../utils/AppError.js";

import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken;

export function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT não informado!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    req.user = {
      id: Number(user_id),
    };

    return next();
  } catch {
    throw new AppError("JWT inválido!", 401);
  }
}
