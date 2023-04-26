import { Router } from "express";
import { DishesController } from "../controllers/DishesController.js";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

export const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get("/", dishesController.index);
dishesRoutes.post("/", ensureUserIsAdmin, dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.put("/:id", ensureUserIsAdmin, dishesController.update);
dishesRoutes.delete("/:id", ensureUserIsAdmin, dishesController.delete);
