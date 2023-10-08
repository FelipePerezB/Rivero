import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.organization.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Colegio Pucón',
    },
  });

  await prisma.organization.upsert({
    where: { name: 'Colegio Alejandria' },
    update: {},
    create: {
      name: 'Colegio Alejandria',
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

  await prisma.user.upsert({
    where: { email: 'felipe@prisma.io' },
    update: {},
    create: {
      externalId: 'hequeqdbqwqd',
      email: 'felipe@prisma.io',
      name: 'Felipe',
      Group: {
        connect: [{ id: 1 }],
      },
      lastname: 'perez',
      role: 'ADMIN',
      organizationId: 1,
    },
  });
  await prisma.user.upsert({
    where: { email: 'martin@prisma.io' },
    update: {},
    create: {
      email: 'martin@prisma.io',
      name: 'Felipe',
      externalId: '821uqwunwsqsiw',
      Group: {
        connect: [{ id: 1 }],
      },
      lastname: 'perez',
      role: 'ADMIN',
      organizationId: 1,
    },
  });
  await prisma.user.upsert({
    where: { email: 'alicia@prisma.io' },
    update: {},
    create: {
      externalId: 'wenjdnkj',
      email: 'alicia@prisma.io',
      name: 'Felipe',
      Group: {
        connect: [{ id: 1 }],
      },
      lastname: 'perez',
      role: 'ADMIN',
      organizationId: 1,
    },
  });

  // subject: "matemática",
  // topic: "álgebra",
  // subtopic: "modelos lineales",
  // document: {
  //   id: "qbxoYMthcK7XlTWyt6L8u7ZdXTEMHUXf",
  //   title: "sistema de ecuaciones",
  //   privacity: "private" as configAttrs["privacity"],
  // content:
  // },

  // await prisma.file.upsert({
  //   create: {
  //     noteId: 1,
  //     authorId: 1,
  //     content:
  //       '{"type":"document","options":{"children":[{"type":"page","options":{"number":1,"children":[{"type":"title","options":{"text":"Titulo 1","size":"h1"}}]}},{"type":"page","options":{"number":1,"children":[{"type":"title","options":{"text":"Sistema ecuaciones","size":"h1"}}]}}]}}',
  //     externalId: 'qbxoYMthcK7XlTWyt6L8u7ZdXTEMHUXf',
  //     title: 'Documento 1',
  //     privacity: 'PRIVATE',
  //   },
  //   where: { externalId: 'qbxoYMthcK7XlTWyt6L8u7ZdXTEMHUXf' },
  //   update: {},
  // });
  // await prisma.file.upsert({
  //   create: {
  //     noteId: 1,
  //     authorId: 2,
  //     content:
  //       '{"type":"document","options":{"children":[{"type":"page","options":{"number":1,"children":[{"type":"title","options":{"text":"Titulo 1","size":"h1"}}]}},{"type":"page","options":{"number":1,"children":[{"type":"title","options":{"text":"Sistema ecuaciones","size":"h1"}}]}}]}}',
  //     externalId: 'YGYGUGUYQWBygxyugyuqgx',
  //     title: 'Documento 1',
  //     privacity: 'PUBLIC',
  //   },
  //   where: { externalId: 'YGYGUGUYQWBygxyugyuqgx' },
  //   update: {},
  // });
  // await prisma.file.upsert({
  //   create: {
  //     authorId: 1,
  //     content:
  //       '{"type":"document","options":{"children":[{"type":"page","options":{"number":1,"children":[{"type":"title","options":{"text":"Titulo 1","size":"h1"}}]}},{"type":"page","options":{"number":1,"children":[{"type":"title","options":{"text":"Sistema ecuaciones","size":"h1"}}]}}]}}',
  //     externalId: 'njwxqajwxixqwjxuihwyu',
  //     title: 'Documento 2',
  //     privacity: 'PUBLIC',
  //   },
  //   where: { externalId: 'njwxqajwxixqwjxuihwyu' },
  //   update: {},
  // });
  // await prisma.file.upsert({
  //   create: {
  //     authorId: 1,
  //     content:
  //       '{"type":"document","options":{"children":[{"type":"page","options":{"number":1,"children":[{"type":"title","options":{"text":"Titulo 1","size":"h1"}}]}},{"type":"page","options":{"number":1,"children":[{"type":"title","options":{"text":"Sistema ecuaciones","size":"h1"}}]}}]}}',
  //     externalId: 'whquhiudhwiuhiwhdquhudiw',
  //     title: 'Documento 3',
  //     privacity: 'PUBLIC',
  //   },
  //   where: { externalId: 'whquhiudhwiuhiwhdquhudiw' },
  //   update: {},
  // });

  await prisma.note.upsert({
    create: {
      type: 'DOCUMENT',
      subtopicId: 1,
      File: {
        create: {
          authorId: 1,
          content:
            '{"type":"document","options":{"children":[{"type":"page","options":{"number":1,"children":[{"type":"title","options":{"text":"Titulo 1","size":"h1"}}]}},{"type":"page","options":{"number":1,"children":[{"type":"title","options":{"text":"Sistema ecuaciones","size":"h1"}}]}}]}}',
          externalId: 'qbxoYMthcK7XlTWyt6L8u7ZdXTEMHUXf',
          title: 'Documento 1',
          privacity: 'PRIVATE',
        },
      },
    },
    where: { id: 1 },
    update: {},
  });

  await prisma.note.upsert({
    create: {
      type: 'DOCUMENT',
      subtopicId: 1,
      File: {
        create: {
          authorId: 1,
          content:
            '{"type":"document","options":{"children":[{"type":"page","options":{"number":1,"children":[{"type":"title","options":{"text":"Titulo 1","size":"h1"}}]}},{"type":"page","options":{"number":1,"children":[{"type":"title","options":{"text":"Sistema ecuaciones","size":"h1"}}]}}]}}',
          externalId: 'uixhuihxihuiij',
          title: 'Documento 2',
          privacity: 'PRIVATE',
        },
      },
    },
    where: { id: 2 },
    update: {},
  });

  await prisma.note.upsert({
    create: {
      type: 'DOCUMENT',
      subtopicId: 1,
      File: {
        create: {
          authorId: 1,
          content:
            '{"type":"document","options":{"children":[{"type":"page","options":{"number":1,"children":[{"type":"title","options":{"text":"Titulo 1","size":"h1"}}]}},{"type":"page","options":{"number":1,"children":[{"type":"title","options":{"text":"Sistema ecuaciones","size":"h1"}}]}}]}}',
          externalId: 'HIUIUXHWIUHWIUXHWB',
          title: 'Documento 3',
          privacity: 'PRIVATE',
        },
      },
    },
    where: { id: 3 },
    update: {},
  });

  await prisma.note.upsert({
    update: {},
    where: { id: 4 },
    create: {
      Subject: {
        connect: {
          id: 1,
        },
      },
      type: 'EVALUATION',
      File: {
        create: {
          privacity: 'PRIVATE',
          title: 'ENSAYO N°1',
          content: 'aaaaaaaaaaaaaaa',
          externalId: 'NWJQKXKXQJKXNQJKXW',
          Author: {
            connect: {
              id: 1,
            },
          },
        },
      },
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
