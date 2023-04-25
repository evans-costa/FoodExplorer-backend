import { Router } from "express";
import { UsersController } from "../controllers/UsersController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

export const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
