import knex from "../database/knex/index.js";
import { AppError } from "../utils/AppError.js";

export class DishesController {
  async index(req, res) {
    const { name, ingredients } = req.query;
    let dishes;

    if (ingredients) {
      const filteredIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim().toLowerCase());

      dishes = await knex("ingredients")
        .select([
          "dishes.id",
          "dishes.name",
          "dishes.category",
          "dishes.price",
          "dishes.description",
          "dishes.image",
        ])
        .whereLike("dishes.name", `%${name}%`)
        .whereIn("ingredients.name", filteredIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .orderBy("dishes.name");
    } else {
      dishes = await knex("dishes").whereLike("name", `%${name}%`).orderBy("name");
    }

    const getIngredients = await knex("ingredients");
    const dishesWithIngredient = dishes.map((dish) => {
      const dishIngredients = getIngredients.filter((ingredient) => ingredient.dish_id === dish.id);

      return {
        ...dish,
        ingredients: dishIngredients,
      };
    });

    return res.json(dishesWithIngredient);
  }

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
        name: item.toLowerCase(),
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

  async update(req, res) {
    const { name, category, price, description, ingredients } = req.body;
    const { id } = req.params;

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Este prato não está cadastrado!");
    }

    dish.name = name ?? dish.name;
    dish.category = category ?? dish.category;
    dish.price = price ?? dish.price;
    dish.description = description ?? dish.description;

    if (!ingredients || !ingredients.length) {
      throw new AppError("Você deve inserir no mínimo um ingrediente!");
    }

    let dishIngredients = await knex("ingredients").where({ dish_id: id });

    dishIngredients = ingredients.map((item) => {
      return {
        dish_id: dish.id,
        name: item,
      };
    });

    await knex("dishes").where({ id }).update({
      name,
      category,
      price,
      description,
    });

    await knex("ingredients").where({ dish_id: id }).delete();
    await knex("ingredients").where({ dish_id: id }).insert(dishIngredients);

    return res.json();
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("dishes").where({ id }).delete();

    return res.json();
  }
}
