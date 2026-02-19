import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider
} from 'fastify-type-provider-zod'

// -> routes
import { authorization } from './routes/auth'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { users } from './routes/user'
import { errorHandler } from './error-handler'
import { env } from '@saas/env'
import { organizations } from './routes/orgs'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)

app.setValidatorCompiler(validatorCompiler)


app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js SaaS',
      description: 'Full-stack SaaS with multi-tenant & RBAC.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/api/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false
  }
})

app.register(fastifyCookie)

app.register(fastifyCors)

// -> Error handler
app.setErrorHandler(errorHandler)

// -> API routes
app.register(async () => {
  app.register(users)
  app.register(authorization)
  app.register(organizations)
}, { prefix: 'api' })

export default app