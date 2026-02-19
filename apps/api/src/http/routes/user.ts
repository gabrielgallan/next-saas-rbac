import { FastifyInstance } from "fastify";
import { profile } from "../controllers/user/profile";
import { auth } from "../middlewares/auth";

export async function users(app: FastifyInstance) {
    /**
     * Register auth middleware plugin
     */
    app.register(auth)

    app.register(profile)
}