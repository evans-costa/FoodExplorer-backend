import { Router } from "express";
import { DishesController } from "../controllers/DishesController.js";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

export const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/", ensureUserIsAdmin, dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", ensureUserIsAdmin, dishesController.delete);
