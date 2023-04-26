import { Router } from "express";

import { usersRoutes } from "./users.routes.js";
import { sessionsRoutes } from "./sessions.routes.js";
import { dishesRoutes } from "./dishes.routes.js";
import { ingredientsRoutes } from "./ingredients.routes.js";

export const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/session", sessionsRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/ingredients", ingredientsRoutes);
