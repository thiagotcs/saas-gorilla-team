import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifyJwt from '@fastify/jwt'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createAccount } from '@/http/routes/auth/create-account'
import { authenticateWithPassword } from '@/http/routes/auth/authenticate-with-password'
import { getProfile } from '@/http/routes/auth/get-profile'
import { errorHandler } from './error-handler'

import { requestPasswordRecover } from '@/http/routes/auth/request-password-recover'
import { resetPassword } from '@/http/routes/auth/reset-password'
import { authenticateWithGoogle } from '@/http/routes/auth/authenticate-with-google'
import { env } from '@saas/env'
import { createAcademy } from '@/http/routes/gyms/create-academy'
import { getMembership } from '@/http/routes/gyms/get-membership'
import { getAcademys } from '@/http/routes/gyms/get-academys'
import { getAcademy } from '@/http/routes/gyms/get-academy'
import { updateAcademy } from '@/http/routes/gyms/update-academy'
import { shutdownAcademy } from '@/http/routes/gyms/shutdown-academy'
import { transferAcademy } from '@/http/routes/gyms/transfer-academy'
import { createTrainingGroup } from '@/http/routes/training-groups/create-training-group'
import { deleteTrainingGroup } from '@/http/routes/training-groups/delete-training-group'
import { getTrainingGroup } from '@/http/routes/training-groups/get-training-group'
import { getTrainingGroups } from '@/http/routes/training-groups/get-training-groups'
import { updateTrainingGroup } from '@/http/routes/training-groups/update-training-group'
import { getMembers } from '@/http/routes/members/get-members'
import { updateMember } from '@/http/routes/members/update-member'
import { removeMember } from '@/http/routes/members/remove-member'
import { createInvite } from '@/http/routes/invites/create-invite'
import { getInvite } from '@/http/routes/invites/get-invite'
import { getInvites } from '@/http/routes/invites/get-invites'
import { acceptInvite } from '@/http/routes/invites/accept-invite'
import { rejectInvite } from '@/http/routes/invites/reject-invite'
import { revokeInvite } from '@/http/routes/invites/revoke-invite'
import { getPendingInvites } from '@/http/routes/invites/get-pending-invites'
import { getAcademyBilling } from '@/http/routes/billing/get-academy-billing'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

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
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(fastifyCors)

app.register(createAccount)
app.register(authenticateWithPassword)
app.register(getProfile)
app.register(authenticateWithGoogle)

app.register(requestPasswordRecover)
app.register(resetPassword)
app.register(getMembership)

app.register(createAcademy)
app.register(getAcademys)
app.register(getAcademy)
app.register(updateAcademy)
app.register(shutdownAcademy)
app.register(transferAcademy)

app.register(createTrainingGroup)
app.register(deleteTrainingGroup)
app.register(getTrainingGroup)
app.register(getTrainingGroups)
app.register(updateTrainingGroup)

app.register(getMembers)
app.register(updateMember)
app.register(removeMember)

app.register(createInvite)
app.register(getInvite)
app.register(getInvites)
app.register(acceptInvite)
app.register(rejectInvite)
app.register(revokeInvite)
app.register(getPendingInvites)

app.register(getAcademyBilling)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('HTTP server running!')
})
