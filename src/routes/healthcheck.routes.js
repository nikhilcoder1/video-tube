import { Router } from "express";
import { heathcheck } from "../controllers/healthcheck.controllers.js";

const router = Router();

router.route("/").get(heathcheck);

export default router;