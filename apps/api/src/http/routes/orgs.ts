import { FastifyInstance } from "fastify";
import { createOrganization } from "../controllers/orgs/create-organization";
import { auth } from "../middlewares/auth";
import { getMembership } from "../controllers/orgs/get-membership";
import { getOrganization } from "../controllers/orgs/get-organization";
import { getOrganizations } from "../controllers/orgs/get-organizations";
import { updateOrganization } from "../controllers/orgs/update-organization";
import { shutdownOrganization } from "../controllers/orgs/shutdown-organization";
import { transferOrganization } from "../controllers/orgs/transfer-ownership";

export async function organizations(app: FastifyInstance) {
    /**
     * Register auth middleware plugin
     */
    app.register(auth)

    app.register(createOrganization)
    app.register(getMembership)
    app.register(getOrganization)
    app.register(getOrganizations)
    app.register(updateOrganization)
    app.register(shutdownOrganization)
    app.register(transferOrganization)
}