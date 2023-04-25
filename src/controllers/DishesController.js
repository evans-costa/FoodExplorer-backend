import knex from "../database/knex/index.js";

export class DishesController {
  async create(req, res) {
    const { name, category, price, description, ingredients } = req.body;

    const [dish_id] = await knex("dishes").insert({
      name,
      category,
      price,
      description,
    });

    const ingredientesInsert = ingredients.map((item) => {
      return {
        dish_id,
        name: item,
      };
    });

    await knex("ingredients").insert(ingredientesInsert);

    return res.json();
  }

  async show(req, res) {
    const { id } = req.params;

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name");

    return res.json({
      ...dish,
      ingredients,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("dishes").where({ id }).delete();

    return res.json();
  }
}
