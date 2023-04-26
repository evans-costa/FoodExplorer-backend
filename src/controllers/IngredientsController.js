import knex from "../database/knex/index.js";

export class IngredientsController {
  async index(req, res) {
    const getIngredients = await knex("ingredients").orderBy("name").groupBy("name");

    return res.json(getIngredients);
  }
}
