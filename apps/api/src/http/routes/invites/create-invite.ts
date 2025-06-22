import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { roleSchema } from '@saas/auth'
import { BadRequestError } from '../_errors/bad-request-error'

export async function createInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/academys/:slug/invites',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Create a new invite',
          security: [{ bearerAuth: [] }],
          body: z.object({
            email: z.string().email(),
            role: roleSchema,
          }),
          params: z.object({
            slug: z.string(),
          }),
          response: {
            201: z.object({
              inviteId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { academy, membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Invite')) {
          throw new UnauthorizedError(
            `You're not allowed to create new invites.`
          )
        }

        const { email, role } = request.body

        const [, domain] = email.split('@')

        if (academy.shouldAttachUsersByDomain && domain !== academy.domain) {
          throw new BadRequestError(
            `Users with ${domain} domain will join your academy automatically no login.`
          )
        }

        const inviteWithSameEmail = await prisma.invite.findUnique({
          where: {
            email_academyId: {
              email,
              academyId: academy.id,
            },
          },
        })

        if (inviteWithSameEmail) {
          throw new BadRequestError(
            `Another invite with the same email already exists.`
          )
        }

        const memberWithSameEmail = await prisma.member.findFirst({
          where: {
            academyId: academy.id,
            user: {
              email,
            },
          },
        })

        if (memberWithSameEmail) {
          throw new BadRequestError(
            `A member with this email already belongs to your academy.`
          )
        }

        const invite = await prisma.invite.create({
          data: {
            academyId: academy.id,
            email,
            role,
            authorId: userId,
          },
        })

        return reply.status(201).send({
          inviteId: invite.id,
        })
      }
    )
}
