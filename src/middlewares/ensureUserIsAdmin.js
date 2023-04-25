import knex from "../database/knex/index.js";
import { AppError } from "../utils/AppError.js";

export async function ensureUserIsAdmin(req, res, next) {
  const user_id = req.user.id;

  const user = await knex("users").where({ id: user_id }).first();

  if (!user.is_admin) {
    throw new AppError("Você não ter permissão para acessar esse serviço", 401);
  }

  next();
}
