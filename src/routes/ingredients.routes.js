import { Router } from "express";
import { IngredientsController } from "../controllers/IngredientsController.js";

export const ingredientsRoutes = Router();

const ingredientsController = new IngredientsController();

ingredientsRoutes.use(ensureAuthenticated);

ingredientsRoutes.get("/", ingredientsController.index);
