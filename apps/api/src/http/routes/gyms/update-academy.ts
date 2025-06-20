import { academySchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function updateAcademy(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/academys/:slug',
      {
        schema: {
          tags: ['Academys'],
          summary: 'Update academy details',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            domain: z.string().nullish(),
            shouldAttachUsersByDomain: z.boolean().optional(),
          }),
          params: z.object({
            slug: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { membership, academy } = await request.getUserMembership(slug)
        const { name, domain, shouldAttachUsersByDomain } = request.body
        const authAcademy = academySchema.parse(academy)
        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('update', authAcademy)) {
          throw new UnauthorizedError(
            `You're not allowed to update this academy. `
          )
        }

        if (domain) {
          const academyByDomain = await prisma.academy.findFirst({
            where: {
              domain,
              id: {
                not: academy.id,
              },
            },
          })

          if (academyByDomain) {
            throw new BadRequestError(
              'Another academy with same domain already exists.'
            )
          }
        }

        await prisma.academy.update({
          where: {
            id: academy.id,
          },
          data: {
            name,
            domain,
            shouldAttachUsersByDomain,
          },
        })

        return reply.status(204).send()
      }
    )
}
