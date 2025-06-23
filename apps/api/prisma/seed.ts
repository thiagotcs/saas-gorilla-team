import { faker } from '@faker-js/faker'
import { PrismaClient } from '../src/generated/prisma'

import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  await prisma.academy.deleteMany()
  await prisma.user.deleteMany()
  await prisma.attendance.deleteMany()
  await prisma.paymentTransaction.deleteMany()
  await prisma.subscription.deleteMany()
  await prisma.subscriptionPlan.deleteMany()
  await prisma.classSession.deleteMany()
  await prisma.trainingGroup.deleteMany()
  await prisma.member.deleteMany()
  await prisma.invite.deleteMany()
  await prisma.account.deleteMany()
  await prisma.token.deleteMany()

  const passwordHash = await hash('123456', 1)

  const adminUser = await prisma.user.create({
    data: {
      name: 'John Doe (Admin Master)',
      email: 'john@example.com',
      avatarUrl: faker.image.avatar(),
      passwordHash,
    },
  })

  const instructorUser = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: 'instructor@example.com',
      avatarUrl: faker.image.avatar(),
      passwordHash,
    },
  })

  const studentUser = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: 'student@example.com',
      avatarUrl: faker.image.avatar(),
      passwordHash,
    },
  })

  const receptionistUser = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: 'reception@example.com',
      avatarUrl: faker.image.avatar(),
      passwordHash,
    },
  })

  const billingUser = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: 'billing@example.com',
      avatarUrl: faker.image.avatar(),
      passwordHash,
    },
  })

  const academy1 = await prisma.academy.create({
    data: {
      name: 'CT Gorilla Team (Matriz)',
      slug: 'ct-gorilla-team-matriz',
      avatarUrl: faker.image.avatar(),
      domain: 'ctg.com',
      shouldAttachUsersByDomain: true,
      ownerId: adminUser.id,
      members: {
        create: [
          { userId: adminUser.id, role: 'ADMIN' },
          { userId: instructorUser.id, role: 'INSTRUTOR' }, // Role INSTRUTOR
          { userId: studentUser.id, role: 'ALUNO' }, // Role ALUNO
          { userId: receptionistUser.id, role: 'RECEPCAO' }, // Role RECEPCAO
        ],
      },
    },
    include: {
      members: true, // Para poder acessar os IDs dos membros criados
    },
  })

  const academy1AdminMemberId = academy1.members.find(
    (m) => m.userId === adminUser.id
  )?.id
  const academy1InstructorMemberId = academy1.members.find(
    (m) => m.userId === instructorUser.id
  )?.id
  const academy1StudentMemberId = academy1.members.find(
    (m) => m.userId === studentUser.id
  )?.id
  const academy1ReceptionistMemberId = academy1.members.find(
    (m) => m.userId === receptionistUser.id
  )?.id

  if (
    !academy1AdminMemberId ||
    !academy1InstructorMemberId ||
    !academy1StudentMemberId ||
    !academy1ReceptionistMemberId
  ) {
    throw new Error('Falha ao criar membros essenciais para a Academia 1.')
  }

  const academy2 = await prisma.academy.create({
    data: {
      name: 'Gorilla Team (Unidade 1)',
      slug: 'gorilla-team-unidade-1',
      avatarUrl: faker.image.avatar(),
      ownerId: adminUser.id,
      members: {
        create: [
          { userId: adminUser.id, role: 'MEMBER' }, // Admin principal é MEMBER aqui
          { userId: instructorUser.id, role: 'MEMBER' }, // Instrutor é MEMBER aqui
          { userId: studentUser.id, role: 'ALUNO' }, // Aluno é ALUNO aqui também
          { userId: billingUser.id, role: 'BILLING' }, // Role BILLING
        ],
      },
    },
    include: {
      members: true, // Para poder acessar os IDs dos membros criados
    },
  })

  const academy2AdminMemberId = academy2.members.find(
    (m) => m.userId === adminUser.id
  )?.id
  const academy2InstructorMemberId = academy2.members.find(
    (m) => m.userId === instructorUser.id
  )?.id
  const academy2StudentMemberId = academy2.members.find(
    (m) => m.userId === studentUser.id
  )?.id
  const academy2BillingMemberId = academy2.members.find(
    (m) => m.userId === billingUser.id
  )?.id

  if (
    !academy2AdminMemberId ||
    !academy2InstructorMemberId ||
    !academy2StudentMemberId ||
    !academy2BillingMemberId
  ) {
    throw new Error('Falha ao criar membros essenciais para a Academia 2.')
  }
  // 4. Popular TrainingGroups para a Academia 1
  const academy1TrainingGroups = await prisma.trainingGroup.createManyAndReturn(
    {
      data: Array.from({ length: 3 }).map(() => ({
        name: faker.lorem.words(3),
        slug: faker.lorem.slug(3),
        description: faker.lorem.paragraph(),
        avatarUrl: faker.image.avatar(),
        academyId: academy1.id,
        ownerId: adminUser.id, // O owner do grupo é o admin da academia
      })),
    }
  )

  // 5. Popular SubscriptionPlans para a Academia 1
  const academy1SubscriptionPlans =
    await prisma.subscriptionPlan.createManyAndReturn({
      data: [
        {
          name: 'Plano Mensal Básico',
          price: faker.number.float({ min: 50, max: 100, fractionDigits: 2 }),
          durationInMonths: 1,
          description: 'Acesso a 2x por semana.',
          academyId: academy1.id,
        },
        {
          name: 'Plano Mensal Ilimitado',
          price: faker.number.float({ min: 100, max: 200, fractionDigits: 2 }),
          durationInMonths: 1,
          description: 'Acesso ilimitado a todas as aulas.',
          academyId: academy1.id,
        },
        {
          name: 'Plano Anual Premium',
          price: faker.number.float({
            min: 1000,
            max: 2000,
            fractionDigits: 2,
          }),
          durationInMonths: 12,
          description: 'Acesso ilimitado + treinos personalizados.',
          academyId: academy1.id,
        },
      ],
    })

  // 6. Popular ClassSessions para a Academia 1
  // Explicitly type the array to avoid 'never' type inference
  const academy1ClassSessions: Awaited<
    ReturnType<typeof prisma.classSession.create>
  >[] = []
  for (let i = 0; i < 5; i++) {
    // Criar 5 sessões
    const randomTrainingGroup = faker.helpers.arrayElement(
      academy1TrainingGroups
    )
    const startTime = faker.date.soon({ days: 30, refDate: new Date() }) // Data futura
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000) // 1 hora depois

    const session = await prisma.classSession.create({
      data: {
        date: startTime,
        startTime: startTime,
        endTime: endTime,
        status: 'SCHEDULED',
        location: faker.helpers.arrayElement([
          'Sala Tatame',
          'Área Musculação',
          'Quadra',
        ]),
        capacity: faker.number.int({ min: 10, max: 30 }),
        academyId: academy1.id,
        trainingGroupId: randomTrainingGroup.id,
        instructorMemberId: academy1InstructorMemberId,
      },
    })
    academy1ClassSessions.push(session)
  }

  // 7. Popular Subscriptions para o Student da Academia 1
  const academy1StudentSubscription = await prisma.subscription.create({
    data: {
      memberId: academy1StudentMemberId,
      subscriptionPlanId: faker.helpers.arrayElement(academy1SubscriptionPlans)
        .id,
      startDate: faker.date.recent({ days: 30 }),
      endDate: faker.date.soon({ days: 365 }), // Plano de 1 ano
      status: 'ACTIVE',
      paymentProvider: 'Stripe',
      paymentProviderRef: faker.string.uuid(),
      academyId: academy1.id,
    },
  })
  // 8. Popular PaymentTransactions para a Academia 1
  // Transação para a assinatura
  await prisma.paymentTransaction.create({
    data: {
      amount: academy1StudentSubscription.endDate
        ? (academy1SubscriptionPlans.find(
            (p) => p.id === academy1StudentSubscription.subscriptionPlanId
          )?.price ?? 100)
        : 100, // Preço do plano ou valor padrão
      currency: 'BRL',
      status: 'COMPLETED',
      type: 'SUBSCRIPTION_PAYMENT',
      transactionDate: faker.date.recent({ days: 20 }),
      externalRef: faker.string.uuid(),
      description: 'Pagamento inicial da assinatura',
      subscriptionId: academy1StudentSubscription.id,
      academyId: academy1.id,
    },
  })
  // Transação avulsa
  await prisma.paymentTransaction.create({
    data: {
      amount: faker.number.float({ min: 10, max: 50, fractionDigits: 2 }),
      currency: 'BRL',
      status: 'COMPLETED',
      type: 'SINGLE_PAYMENT',
      transactionDate: faker.date.recent({ days: 5 }),
      externalRef: faker.string.uuid(),
      description: 'Compra de garrafa de água',
      academyId: academy1.id,
      subscription: {
        connect: { id: academy1StudentSubscription.id },
      },
    },
  })
  // 9. Popular Attendances para o Student da Academia 1
  for (let i = 0; i < 3; i++) {
    // Registrar 3 presenças para o aluno
    const randomClassSession = faker.helpers.arrayElement(academy1ClassSessions)
    // Para garantir que a data da presença não seja depois da data da sessão
    const checkInDate = new Date(
      randomClassSession.date.getTime() +
        faker.number.int({ min: 0, max: 10 * 60 * 1000 })
    ) // Até 10 minutos após o início da sessão

    await prisma.attendance.create({
      data: {
        checkInTime: checkInDate,
        status: faker.helpers.arrayElement(['PRESENT', 'LATE']),
        studentMemberId: academy1StudentMemberId,
        classSessionId: randomClassSession.id,
        academyId: academy1.id,
      },
    })
  }
}

seed().then(() => {
  console.log('Banco de dados populado com sucesso!')
  prisma.$disconnect()
})
