import { FastifyInstance } from "fastify";
import { register } from "../controllers/auth/register";
import { authenticateWithPass } from "../controllers/auth/authenticate-with-pass";
import { requestPasswordRecover } from "../controllers/auth/request-password-recover";
import { resetPassword } from "../controllers/auth/reset-password";
import { authenticateWithGithub } from "../controllers/auth/authenticate-with-github";
import { refreshToken } from "../controllers/auth/refresh-token";
import { auth } from "../middlewares/auth";

export async function authorization(app: FastifyInstance) {
    /**
     * Register auth middleware plugin
     */
    app.register(auth)

    app.register(register)

    app.register(authenticateWithPass)
    app.register(authenticateWithGithub)
    app.register(refreshToken)

    app.register(requestPasswordRecover)
    app.register(resetPassword)
}