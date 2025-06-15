import { faker } from '@faker-js/faker'
import { PrismaClient } from '../src/generated/prisma'

import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  await prisma.academy.deleteMany()
  await prisma.user.deleteMany()

  const passwordHash = await hash('123456', 1)

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@gracie.com',
      avatarUrl: 'https://github.com/diego3g.png',
      passwordHash,
    },
  })

  const instructor = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatar(),
      passwordHash,
    },
  })

  const aluno = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatar(),
      passwordHash,
    },
  })

  await prisma.academy.create({
    data: {
      name: 'CT Gorilla Team (Matriz)',
      slug: 'ct-gorilla-team-matriz',
      avatarUrl: faker.image.avatar(),
      domain: 'ctg.com'.toLowerCase(),
      shouldAttachUsersByDomain: true,
      ownerId: user.id,
      classes: {
        createMany: {
          data: Array.from({ length: 3 }).map(() => ({
            name: faker.lorem.words(3),
            slug: faker.lorem.slug(3),
            description: faker.lorem.paragraph(),
            avatarUrl: faker.image.avatar(),
            ownerId: faker.helpers.arrayElement([
              user.id,
              instructor.id,
              aluno.id,
            ]),
          })),
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: user.id,
              role: 'ADMIN',
            },
            {
              userId: instructor.id,
              role: 'MEMBER',
            },
            {
              userId: aluno.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  })

  await prisma.academy.create({
    data: {
      name: 'Gorilla Team (Unidade 1)',
      slug: 'gorilla-team-unidade-1',
      avatarUrl: faker.image.avatar(),
      ownerId: user.id,
      classes: {
        createMany: {
          data: Array.from({ length: 3 }).map(() => ({
            name: faker.lorem.words(3),
            slug: faker.lorem.slug(3),
            description: faker.lorem.paragraph(),
            avatarUrl: faker.image.avatar(),
            ownerId: faker.helpers.arrayElement([
              user.id,
              instructor.id,
              aluno.id,
            ]),
          })),
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: user.id,
              role: 'BILLING',
            },
            {
              userId: instructor.id,
              role: 'ADMIN',
            },
            {
              userId: aluno.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  })
}

seed().then(() => {
  console.log('Banco de dados populado com sucesso!')
})
