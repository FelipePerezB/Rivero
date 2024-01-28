import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  return;
  await prisma.organization.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Colegio Pucón',
    },
  });

  await prisma.group.upsert({
    where: { id: 1 },
    update: {},
    create: {
      organizationId: 1,
      name: '1° Medio',
    },
  });

  await prisma.group.upsert({
    where: { id: 2 },
    update: {},
    create: {
      organizationId: 1,
      name: '2° Medio',
    },
  });

  await prisma.group.upsert({
    where: { id: 3 },
    update: {},
    create: {
      organizationId: 1,
      name: '3° Medio',
    },
  });

  await prisma.group.upsert({
    where: { id: 4 },
    update: {},
    create: {
      organizationId: 1,
      name: '4° Medio',
    },
  });

  await prisma.subject.upsert({
    where: { name: 'lenguaje' },
    update: {},
    create: {
      name: 'lenguaje',
      color: '#46d37e',
    },
  });

  await prisma.subject.upsert({
    where: { name: 'matemática' },
    update: {},
    create: {
      name: 'matemática',
      color: '#e86675',
    },
  });

  await prisma.topic.upsert({
    where: { name: 'álgebra' },
    update: {},
    create: {
      name: 'álgebra',
      subjectId: 2,
    },
  });

  await prisma.topic.upsert({
    where: { name: 'geometria' },
    update: {},
    create: {
      name: 'geometria',
      subjectId: 2,
    },
  });

  await prisma.subtopic.upsert({
    where: { name: 'ecuaciones' },
    update: {},
    create: {
      name: 'ecuaciones',
      topicId: 1,
    },
  });

  await prisma.subtopic.upsert({
    where: { name: 'productos notables' },
    update: {},
    create: {
      name: 'productos notables',
      topicId: 1,
    },
  });

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
