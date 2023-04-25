import knex from "../database/knex/index.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";
const { hash, compare } = bcrypt;

export class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const [checkUserExists] = await knex("users").where({ email });

    if (checkUserExists) {
      throw new AppError("Este usuário já está cadastrado!");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json();
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const { id } = req.params;

    const [user] = await knex("users").where({ id });

    if (!user) {
      throw new AppError("Este usuário não existe!");
    }

    const [userWithUpdatedEmail] = await knex("users").where({ email });

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está cadastrado!");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Você precisa inserir sua senha antiga!");
    }

    if (password && old_password) {
      const comparePassword = await compare(old_password, user.password);

      if (!comparePassword) {
        throw new AppError("Sua senha antiga não confere!");
      }

      user.password = await hash(password, 8);
    }

    await knex("users").update({
      name,
      email,
      password: user.password,
    });

    return res.json();
  }
}
